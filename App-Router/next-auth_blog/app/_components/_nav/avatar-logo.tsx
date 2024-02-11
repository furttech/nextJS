import Image from "next/image";
import { lusitana } from "../fonts";

export default function Avatar() {
    return (
        <div className={`${lusitana.className} flex flex-row items-center leading-none text-black`}>
            <Image src={"/images/default.png"} alt="User Image" height={42} width={42} />
        </div>
    )
}