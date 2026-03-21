import ThumbnailMaker from "@/views/thumbnailMaker/ThumbnailMaker";
import PayProvider from "@/views/home/pay/PayProvider";

export default function Page() {
  return (
    <PayProvider>
      <ThumbnailMaker />
    </PayProvider>
  );
}
