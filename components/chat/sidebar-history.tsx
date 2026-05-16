"use client";

import { isToday, isYesterday, subMonths, subWeeks } from "date-fns";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import type { User } from "next-auth";
import { useState } from "react";
import { toast } from "sonner";
import useSWRInfinite from "swr/infinite";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  useSidebar,
} from "@/components/ui/sidebar";
import type { Chat } from "@/lib/db/schema";
import { fetcher } from "@/lib/utils";
import { LoaderIcon } from "./icons";
import { ChatItem } from "./sidebar-history-item";

type GroupedChats = {
  today: Chat[];
  yesterday: Chat[];
  lastWeek: Chat[];
  lastMonth: Chat[];
  older: Chat[];
};

export type ChatHistory = {
  chats: Chat[];
  hasMore: boolean;
};

const PAGE_SIZE = 20;

const MATERIA_LABELS: Record<string, string> = {
  poo: "POO",
  "estructura-de-datos": "Datos",
  "ingenieria-de-software": "Ing. SW",
};

const MATERIA_OPTIONS = [
  { id: "todas", label: "Todas" },
  { id: "poo", label: "POO" },
  { id: "estructura-de-datos", label: "Datos" },
  { id: "ingenieria-de-software", label: "Ing. SW" },
];

const groupChatsByDate = (chats: Chat[]): GroupedChats => {
  const now = new Date();
  const oneWeekAgo = subWeeks(now, 1);
  const oneMonthAgo = subMonths(now, 1);

  return chats.reduce(
    (groups, chat) => {
      const chatDate = new Date(chat.createdAt);
      if (isToday(chatDate)) groups.today.push(chat);
      else if (isYesterday(chatDate)) groups.yesterday.push(chat);
      else if (chatDate > oneWeekAgo) groups.lastWeek.push(chat);
      else if (chatDate > oneMonthAgo) groups.lastMonth.push(chat);
      else groups.older.push(chat);
      return groups;
    },
    {
      today: [],
      yesterday: [],
      lastWeek: [],
      lastMonth: [],
      older: [],
    } as GroupedChats
  );
};

export function getChatHistoryPaginationKey(
  pageIndex: number,
  previousPageData: ChatHistory
) {
  if (previousPageData && previousPageData.hasMore === false) return null;
  if (pageIndex === 0) {
    return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/api/history?limit=${PAGE_SIZE}`;
  }
  const firstChatFromPage = previousPageData.chats.at(-1);
  if (!firstChatFromPage) return null;
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/api/history?ending_before=${firstChatFromPage.id}&limit=${PAGE_SIZE}`;
}

export function SidebarHistory({ user }: { user: User | undefined }) {
  const { setOpenMobile } = useSidebar();
  const pathname = usePathname();
  const id = pathname?.startsWith("/chat/") ? pathname.split("/")[2] : null;
  const router = useRouter();

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  // ✅ NUEVO: filtro por materia
  const [filtroMateria, setFiltroMateria] = useState("todas");

  const {
    data: paginatedChatHistories,
    setSize,
    isValidating,
    isLoading,
    mutate,
  } = useSWRInfinite<ChatHistory>(
    user ? getChatHistoryPaginationKey : () => null,
    fetcher,
    { fallbackData: [], revalidateOnFocus: false }
  );

  const hasReachedEnd = paginatedChatHistories
    ? paginatedChatHistories.some((page) => page.hasMore === false)
    : false;

  const hasEmptyChatHistory = paginatedChatHistories
    ? paginatedChatHistories.every((page) => page.chats.length === 0)
    : false;

  const handleDelete = () => {
    const chatToDelete = deleteId;
    const isCurrentChat = pathname === `/chat/${chatToDelete}`;
    setShowDeleteDialog(false);
    if (isCurrentChat) router.replace("/");
    mutate((chatHistories) => {
      if (chatHistories) {
        return chatHistories.map((chatHistory) => ({
          ...chatHistory,
          chats: chatHistory.chats.filter((chat) => chat.id !== chatToDelete),
        }));
      }
    });
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/api/chat?id=${chatToDelete}`,
      { method: "DELETE" }
    );
    toast.success("Chat eliminado");
  };

  if (!user) {
    return (
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupContent>
          <div className="flex w-full flex-row items-center justify-center gap-2 px-2 text-[13px] text-sidebar-foreground/60">
            Inicia sesión para ver tu historial
          </div>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  }

  if (isLoading) {
    return (
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel className="text-[10px] font-semibold uppercase tracking-[0.12em] text-sidebar-foreground/70">
          Historial
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <div className="flex flex-col gap-0.5 px-1">
            {[44, 32, 28, 64, 52].map((item) => (
              <div
                className="flex h-8 items-center gap-2 rounded-lg px-2"
                key={item}
              >
                <div
                  className="h-3 max-w-(--skeleton-width) flex-1 animate-pulse rounded-md bg-sidebar-foreground/[0.06]"
                  style={
                    { "--skeleton-width": `${item}%` } as React.CSSProperties
                  }
                />
              </div>
            ))}
          </div>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  }

  if (hasEmptyChatHistory) {
    return (
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel className="text-[10px] font-semibold uppercase tracking-[0.12em] text-sidebar-foreground/70">
          Historial
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <div className="flex w-full flex-row items-center justify-center gap-2 px-2 text-[13px] text-sidebar-foreground/60">
            Tus conversaciones aparecerán aquí cuando empieces a chatear.
          </div>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  }

  return (
    <>
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel className="text-[10px] font-semibold uppercase tracking-[0.12em] text-sidebar-foreground/70">
          Historial
        </SidebarGroupLabel>

        {/* ✅ NUEVO: filtros por materia */}
        <div className="flex gap-1 flex-wrap px-2 mb-2">
          {MATERIA_OPTIONS.map((op) => (
            <button
              className={`px-2 py-0.5 rounded-full text-[10px] font-medium border transition-all ${
                filtroMateria === op.id
                  ? "bg-sidebar-primary text-sidebar border-sidebar-primary"
                  : "bg-transparent text-sidebar-foreground/50 border-sidebar-border hover:border-sidebar-foreground/30"
              }`}
              key={op.id}
              onClick={() => setFiltroMateria(op.id)}
              type="button"
            >
              {op.label}
            </button>
          ))}
        </div>

        <SidebarGroupContent>
          <SidebarMenu>
            {paginatedChatHistories &&
              (() => {
                const allChats = paginatedChatHistories.flatMap(
                  (page) => page.chats
                );

                // ✅ filtrar por materia
                const chatsFiltrados =
                  filtroMateria === "todas"
                    ? allChats
                    : allChats.filter((c) => c.materia === filtroMateria);

                if (chatsFiltrados.length === 0) {
                  return (
                    <div className="px-2 py-3 text-[12px] text-sidebar-foreground/50 text-center">
                      No hay chats de{" "}
                      {MATERIA_LABELS[filtroMateria] ?? filtroMateria}
                    </div>
                  );
                }

                const groupedChats = groupChatsByDate(chatsFiltrados);

                const groups = [
                  { label: "Hoy", chats: groupedChats.today },
                  { label: "Ayer", chats: groupedChats.yesterday },
                  { label: "Últimos 7 días", chats: groupedChats.lastWeek },
                  { label: "Últimos 30 días", chats: groupedChats.lastMonth },
                  { label: "Anterior", chats: groupedChats.older },
                ];

                return (
                  <div className="flex flex-col gap-4">
                    {groups.map(
                      (group) =>
                        group.chats.length > 0 && (
                          <div key={group.label}>
                            <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-sidebar-foreground/70">
                              {group.label}
                            </div>
                            {group.chats.map((chat) => (
                              <ChatItem
                                chat={chat}
                                isActive={chat.id === id}
                                key={chat.id}
                                onDelete={(chatId) => {
                                  setDeleteId(chatId);
                                  setShowDeleteDialog(true);
                                }}
                                setOpenMobile={setOpenMobile}
                              />
                            ))}
                          </div>
                        )
                    )}
                  </div>
                );
              })()}
          </SidebarMenu>

          <motion.div
            onViewportEnter={() => {
              if (!isValidating && !hasReachedEnd) {
                setSize((size) => size + 1);
              }
            }}
          />

          {hasReachedEnd ? null : (
            <div className="mt-1 flex flex-row items-center gap-2 px-4 py-2 text-sidebar-foreground/50">
              <div className="animate-spin">
                <LoaderIcon />
              </div>
              <div className="text-[11px]">Cargando...</div>
            </div>
          )}
        </SidebarGroupContent>
      </SidebarGroup>

      <AlertDialog onOpenChange={setShowDeleteDialog} open={showDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar este chat?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El chat será eliminado
              permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
