import {Star, User, Image as ImageIcon, Camera} from "lucide-react";

// const compositionOptions = [
//   {
//     id: "expert",
//     label: "전문가",
//     desc: "전문가 맞춰 구도로\n사진 보정",
//     icon: Star,
//     img: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&q=80&w=200&h=200",
//   },
//   {
//     id: "portrait",
//     label: "인물 중심",
//     desc: "인물에\n집중한 구도",
//     icon: User,
//     img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200",
//   },
//   {
//     id: "background",
//     label: "배경 포함",
//     desc: "배경과 건물을\n함께 구성",
//     icon: ImageIcon,
//     img: "https://images.unsplash.com/photo-1506744626753-eda8183114d0?auto=format&fit=crop&q=80&w=200&h=200",
//   },
//   {
//     id: "custom",
//     label: "사용자",
//     desc: "업로드한 사진\n선택 유지",
//     icon: Camera,
//     img: "https://images.unsplash.com/photo-1516961642265-531546e84af2?auto=format&fit=crop&q=80&w=200&h=200",
//   },
// ];

const compositionOptions: CompositionOption[] = [
  {
    id: "expert",
    label: "전문가",
    desc: "전문가 화질 구도로\n사진 보정",
    icon: Star,
    img: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100&h=100&fit=crop",
  },
  {
    id: "portrait",
    label: "인물 중심",
    desc: "인물에 화각을\n집중한 구도",
    icon: User,
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
  {
    id: "background",
    label: "배경 모합",
    desc: "배경과 인물을\n함께 구성",
    icon: ImageIcon,
    img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=100&h=100&fit=crop",
  },
  {
    id: "user",
    label: "사용자",
    desc: "업로드한 사진\n선택 유지",
    icon: Camera,
    img: "https://images.unsplash.com/photo-1502767089025-6572583495f9?w=100&h=100&fit=crop",
  },
];

export {compositionOptions};
