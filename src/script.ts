const msg: string = "Hello!";
alert(msg);
document.querySelector("#styl1")?.addEventListener("click", () => changestyle(0));
document.querySelector("#styl2")?.addEventListener("click", () => changestyle(1));
document.querySelector("#styl3")?.addEventListener("click", () => changestyle(2));
const StyleArray: string[] = ["style-1.css","style-2.css","style-3.css"];
export function changestyle(StyleNumber: number):void{
    const stylelink=document.querySelector<HTMLLinkElement>("#StyleLink");
    if(!stylelink) {console.log("No querry");return;}
    stylelink.href=StyleArray[StyleNumber];
}
