import Random from "./components/Random";
import Tag from "./components/Tag";

export default function App(){
    return (

        <div className='flex flex-col items-center bg-gradient-to-r from-blue-200 to-cyan-200 overflow-x-hidden w-full h-screen'>

            <h1 className="bg-white rounded-md w-[350px] text-center mt-[20px] mx-auto 
            py-3 text-3xl font-bold font-serif">GIFS👻</h1>

            <div className="flex flex-col items-center w-full gap-y-10 mt-[30px]">
                <Random/>
                <Tag/>
            </div>

        </div>

    );
}