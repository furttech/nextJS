import { fetchUserDiscovery } from "@/app/_actions/discoveryActions";

export default async function DiscoveryTable({ currentPage }: { currentPage: number }) {

    const users = await fetchUserDiscovery(currentPage);

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    {
                         users?.map((user) => (

                            <div className="max-w-sm pt-2 rounded overflow-hidden shadow-lg">
                                <div className="w-full flex-row items-center justify-between border-2 rounded-sm border-cyan-500">
                                    <img className="flex h-full w-full p-2" src={"/images/default.png"} alt="Post Image Location" />
                                </div>
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2 text-gray-400">
                                        {user.id}
                                    </div>
                                    <p className="text-gray-700 text-base">
                                        {user.name}
                                    </p>
                                </div>
                                <div className="px-6 pt-4 pb-2">
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                                </div>
                            </div>

                        ))
                    }
                </div>
            </div>
        </div>

    )


}