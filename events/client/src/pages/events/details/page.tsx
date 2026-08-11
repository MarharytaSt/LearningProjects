import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";
import { useEventsStore } from "@/stores/events-store";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { EventDetailsCard } from "../components/events-details-card";
import { useEventById } from "../hooks/use-event-by-id";

export function EventDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const user = useAuthStore(s => s.user);
    const joinedEvents = useEventsStore(s => s.joinedEvents);
    const joinEvent = useEventsStore(s => s.joinEvent);
    const leaveEvent = useEventsStore(s => s.leaveEvent);
    const mutationLoading = useEventsStore(s => s.mutationLoading);
    const eventsError = useEventsStore(s => s.eventsError);
    const removeEvent = useEventsStore(s => s.removeEvent);
    const navigate = useNavigate();

    const { event, loading, notFound, loadError } = useEventById(id, {
        prefetchJoinedEvents: true
    })

    if (!id) {
        return <Navigate to='/events' replace />
    }

    if (loading) {
        return (
            <PageShell title="Событие">
                <span>Загрузка</span>
            </PageShell>
        )
    }

    if (notFound) {
        return (
            <PageShell title="Событие не найдено">
                <span>Такого события нет</span>
            </PageShell>
        )
    }

    if (loadError || !event) {
        <PageShell title="Ошибка">
            {loadError && <span>{loadError}</span>}
        </PageShell>
    }

    const isOwner = user?.id === event.ownerId;
    const isJoined = joinedEvents.some(row => row.event.id === event.id);
    const eventId = event.id;

    async function handleJoin() {
        try {
            await joinEvent(eventId);
        } catch (error) {

        }
    }

    async function handleLeave() {
        try {
            await leaveEvent(eventId);
        } catch (error) {

        }
    }

    async function handleRemove() {
        const ok = confirm('Удалить событие');

        if(!ok) return;

        try {
            await removeEvent(eventId);
            navigate('/events', {replace: true});
        } catch (error) {
            
        }
    }

    return (
        <PageShell title={event.title}>
            <div className="mx-auti flex w-full max-w-2xl flex-col gap-4">
                <Button
                    variant="ghost"
                    size="sm"
                    className="w-fit"
                    asChild
                >
                    <Link to="/events">
                        Назад к списку
                    </Link>
                </Button>
                <EventDetailsCard
                    event={event}
                    isJoined={isJoined}
                    isOwner={isOwner}
                    mutationLoading={mutationLoading}
                    eventsError={eventsError}
                    onLeave={handleLeave}
                    onJoin={handleJoin}
                    onRemove={handleRemove}

                />
            </div>
        </PageShell>
    )

}