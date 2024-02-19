import Breadcrumbs from "@/app/_components/_nav/breadcrumbs";

export default function FeedPage() {
    return (
        <main className="min-h-screen">
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Private Posts', href: '/blog/feed' },
                    {
                        label: 'Public Feed',
                        href: '/blog/wall',
                        active: true,
                    },
                ]} />
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <h1>This is the Public Wall!</h1>
                <p> Welcome to the feed page </p>

            </div>
        </main>
    )
}