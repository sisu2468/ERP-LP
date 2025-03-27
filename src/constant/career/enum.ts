import { CulturePoint } from "@/constant/career/interface";
import { FaRocket, FaLightbulb, FaUsers, FaFutbol, FaGraduationCap } from "react-icons/fa";

export const culturePoints: CulturePoint[] = [
    {
        title: "成長する組織",
        description: "私たちは常に変化を受け入れ、挑戦し続けます。新しい視点や多様な発想を尊重し、進化を止めない会社です。一つ一つの挑戦が、よりよいプロダクトと成長につながります。昨日より今日、今日より明日。前進し続けることが、サンイタの文化です。",
        icon: FaRocket,
        color: "blue.400"
    },
    {
        title: "自ら価値を生み出す",
        description: "創業期だからこそ、一人ひとりの役割が大きく、挑戦できる領域も無限に広がっています。待つのではなく、自ら考え、行動し、変革を起こせる環境です。「こうしたい」という意思があれば、それを実現するチャンスがここにあります。",
        icon: FaLightbulb,
        color: "yellow.400"
    },
    {
        title: "オープンで協力的なチーム",
        description: "組織の壁を作らず、誰もが意見を出し合い議論できる風土を大切にしています。本質的な価値を追求するために、異なる視点を尊重し、互いに刺激を与えながら成長していきます。",
        icon: FaUsers,
        color: "green.400"
    },
    {
        title: "共に未来を創る",
        description: "サインタはまだ始まったばかりの旅の途中です。大きな可能性を秘めたスタートアップだからこそ、自分の手で未来を創る実感を得られます。会社の成長とともに、自分自身も新しい挑戦を続けられる環境です。",
        icon: FaFutbol,
        color: "purple.400"
    },
    {
        title: "自律的なキャリア形成",
        description: "自分の成長を自分の手でデザインできます。役割にとらわれることなく、新しいスキルや知識を積み重ね、様々な領域に挑戦できるのがスタートアップの醍醐味です。サインタでは、自分の成長が直接会社の成長につながることを実感できます。",
        icon: FaGraduationCap,
        color: "orange.400"
    }
];