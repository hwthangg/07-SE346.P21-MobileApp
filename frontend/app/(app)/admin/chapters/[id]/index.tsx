import { useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function ChapterIndex() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const id = params.id as string;

  // Automatically redirect to the general tab in the (tabs) folder
  // Using push instead of replace to maintain navigation history
  useEffect(() => {
    router.push(`/admin/chapters/${id}/(tabs)/general`);
  }, []);

  return null;
}
