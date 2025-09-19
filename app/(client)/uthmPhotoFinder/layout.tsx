import SecurePage from "@/components/secure-page";

export default function UthmPhotoFinder({
    children,
}: {
    children: React.ReactNode;
}) {
    return <SecurePage>{children}</SecurePage>;
}
