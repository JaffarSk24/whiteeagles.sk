import { redirect } from "next/navigation";

export const metadata = {
  other: {
    "seznam-wmt": "WfarbRzOeP8RMWhMM7ARXPpViep5Zg9p",
  },
};

export default function RootPage() {
  redirect("/sk");
}
