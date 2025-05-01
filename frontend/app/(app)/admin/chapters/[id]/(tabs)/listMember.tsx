import React from "react";
import { ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import MemberItem from "@/components/MemberItem";

interface MemberType {
  id: string;
  fullname: string;
  phoneNumber: string;
  chapterId: string;
  imageUri?: any;
}

const ListMember = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  // Sample
  const members: MemberType[] = [
    {
      id: "75TD6712",
      fullname: "Võ Thế Quyền",
      phoneNumber: "0946001469",
      chapterId: "Thành Đoàn TP. HCM",
      imageUri: require("@/assets/images/avatar-placeholder.png"),
    },
    {
      id: "75TD6713",
      fullname: "Nguyễn Văn A",
      phoneNumber: "0946001470",
      chapterId: "Thành Đoàn TP. HCM",
    },
    {
      id: "75TD6714",
      fullname: "Trần Thị B",
      phoneNumber: "0946001471",
      chapterId: "Thành Đoàn TP. HCM",
      imageUri: require("@/assets/images/avatar-placeholder.png"),
    },
  ];

  const navigateToMemberDetail = (memberId: string) => {
    console.log(`Navigate to member detail: ${memberId}`);
  };

  const handleDeleteMember = (memberId: string) => {
    console.log(`Delete member: ${memberId}`);
  };

  return (
    <ScrollView className='flex-1 bg-white px-4 py-3'>
      {members.map((member) => (
        <MemberItem
          key={member.id}
          fullname={member.fullname}
          id={member.id}
          phoneNumber={member.phoneNumber}
          chapterId={member.chapterId}
          imageUri={member.imageUri}
          onPress={() => navigateToMemberDetail(member.id)}
          onDelete={() => handleDeleteMember(member.id)}
        />
      ))}
    </ScrollView>
  );
};

export default ListMember;
