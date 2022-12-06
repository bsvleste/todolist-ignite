import { Logo } from "../Logo";

export function Header(){
    return (
        <div className="flex justify-center items-center h-52 w-full bg-gray-700">
            <Logo/>
        </div>
    )
}