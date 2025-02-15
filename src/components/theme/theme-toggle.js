import Image from "next/image";
import ThemeContext from '@/components/theme/theme-context';
import { useContext } from "react";

export default function ThemeToggle() {
    const { setTheme, theme } = useContext(ThemeContext);

    return (
        <button type="button" onClick={() => setTheme()}>
            <Image src={theme.image} alt={theme.imageAlt} width={30} height={30}></Image>
        </button>
    )
}
