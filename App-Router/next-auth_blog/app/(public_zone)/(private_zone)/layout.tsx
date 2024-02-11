import SideNav from "@/app/_components/_nav/sidenav";

export default function Layout({ children }: { children : React.ReactNode}){
    return (
        <div className="flex flex-row flex-auto bg-gray-500">
            <div className="bg-blue-700" >
                <SideNav />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>
    );
}