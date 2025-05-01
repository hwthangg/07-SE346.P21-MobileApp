import React from "react";
import { ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import DocumentItem from "@/components/DocumentItem";

interface DocumentType {
  id: string;
  title: string;
  date: string;
  createdAt: string;
  type: string;
}

const ListDocument = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Sample 
  const documents: DocumentType[] = [
    {
      id: "1",
      title:
        "Danh sách Ban Chấp hành Trung ương Đoàn (tính đến thời điểm hiện tại)",
      date: "20/09/2022",
      createdAt: "Nơi ban hành",
      type: "Loại",
    },
    {
      id: "2",
      title:
        "Báo cáo tổng kết công tác Đoàn và phong trào thanh thiếu nhi năm 2024",
      date: "15/03/2025",
      createdAt: "Thành Đoàn TP.HCM",
      type: "Báo cáo",
    },
    {
      id: "3",
      title: "Kế hoạch tổ chức Đại hội Đại biểu Đoàn TNCS Hồ Chí Minh năm 2025",
      date: "10/02/2025",
      createdAt: "Trung ương Đoàn",
      type: "Kế hoạch",
    },
  ];

  const navigateToDocumentDetail = (documentId: string) => {
    // Implement navigation to document detail page
    console.log(`Navigate to document detail: ${documentId}`);
  };

  const handleDeleteDocument = (documentId: string) => {
    // Implement delete document logic
    console.log(`Delete document: ${documentId}`);
  };

  return (
    <ScrollView className='flex-1 bg-white px-4 py-3'>
      {documents.map((document) => (
        <DocumentItem
          key={document.id}
          title={document.title}
          date={document.date}
          createdAt={document.createdAt}
          type={document.type}
          onPress={() => navigateToDocumentDetail(document.id)}
          onDelete={() => handleDeleteDocument(document.id)}
        />
      ))}
    </ScrollView>
  );
};

export default ListDocument;
