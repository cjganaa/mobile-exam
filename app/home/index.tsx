import { Link, Stack } from 'expo-router';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import React, { useState } from "react";
import { Fontisto } from '@expo/vector-icons';

export function ProfileCard(props:any) {
  return (
    <View style={header.card}>
        <View style={header.iconContainer}>
          <Link href={"/menu"}><Fontisto name="nav-icon-grid-a" size={24} color="white" /></Link>
        </View>
        <View style={header.textContainer}>
          <Text style={header.name}>Болд-Эрдэнэ Ган-Эрдэнэ</Text>
          <Text style={header.className}>se401</Text>
        </View>
        <View style={header.imageWrapper}>
          <Image
            source={require('../../assets/images/profile.jpg')} // Replace with actual image URL
            style={header.profileImage}
          />
        </View>
      </View>
  );
}

const notices = [
  { "id": "1", "title": "Дараагийн сард сургуулийн амралт эхэлнэ", "date": "2025-03-02", "image": "" },
  { "id": "2", "title": "Зуны номын үзэсгэлэн 6-р сард болно", "date": "2025-03-02", "image": "" },
  { "id": "3", "title": "Програм хангамжийн инженерчлэлийн семинар болно", "date": "2025-03-05", "image": "" },
  { "id": "4", "title": "Хакатон тэмцээн зохион байгуулагдана", "date": "2025-03-10", "image": "" },
  { "id": "5", "title": "Компьютерийн сүлжээний практик сургалт", "date": "2025-03-15", "image": "" },
  { "id": "6", "title": "Ажлын байрны өдөрлөг: Програм хангамжийн чиглэл", "date": "2025-03-18", "image": "" },
  { "id": "7", "title": "Оюутнуудын бүтээлийн үзэсгэлэн гарна", "date": "2025-03-20", "image": "" }
];

type Attendance = {
  id: string;
  subject: string;
  present: number;
  absent: number;
  leave: number;
  teacher: string;
};

const attendanceData: Attendance[] = [
  { "id": "1", "subject": "Мобайл хөгжүүлэлт", "present": 80, "absent": 15, "leave": 5, "teacher": "Батсайхан" },
  { "id": "2", "subject": "Програмчлалын үндэс", "present": 90, "absent": 5, "leave": 5, "teacher": "Оюунчимэг" },
  { "id": "3", "subject": "Мэдээллийн сан", "present": 75, "absent": 20, "leave": 5, "teacher": "Доржсүрэн" },
  { "id": "4", "subject": "Веб хөгжүүлэлт", "present": 85, "absent": 10, "leave": 5, "teacher": "Сарантуяа" },
  { "id": "5", "subject": "Өгөгдлийн бүтэц ба алгоритм", "present": 70, "absent": 20, "leave": 10, "teacher": "Эрдэнэбат" },
  { "id": "6", "subject": "Компьютерийн сүлжээ", "present": 95, "absent": 3, "leave": 2, "teacher": "Нарангэрэл" },
  { "id": "7", "subject": "Програм хангамжийн инженерчлэл", "present": 60, "absent": 30, "leave": 10, "teacher": "Ганзориг" },
  { "id": "8", "subject": "Операцийн систем", "present": 85, "absent": 10, "leave": 5, "teacher": "Цэцэгмаа" },
  { "id": "9", "subject": "DevOps ба серверийн удирдлага", "present": 90, "absent": 5, "leave": 5, "teacher": "Мөнхбаяр" },
  { "id": "10", "subject": "Хиймэл оюун ухаан", "present": 75, "absent": 15, "leave": 10, "teacher": "Уянга" }
];

const header = StyleSheet.create({
  card: {
    width: "100%",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#822321"
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    color: "white",
    fontSize: 18,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  className: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
  },
  imageWrapper: {
    position: "relative",
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "white",
  }
});

export default function Home() {
    const [homework, setHomework] = useState<Attendance[]>(attendanceData);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedHomework, setSelectedHomework] = useState<Attendance | null>(null);

    const handleHomeworkPress = (item: Attendance) => {
      setSelectedHomework(item);
      setModalVisible(true);
    };

    const closeModal = () => {
      setModalVisible(false);
      setSelectedHomework(null);
    };

    return (
    <View style={styles.container}>
      <ProfileCard/>
      <Text style={styles.sectionTitle}>Мэдэгдэл</Text>
      <View style={styles.innerContainer}>
      <FlatList
        style={{
            minHeight:180
        }}
        horizontal
        data={notices}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.noticeCard}>
            {item.image ? (
              <Image source={{ uri: item.image }} style={styles.noticeImage} />
            ) : (
              <View style={[styles.noticeImage, { backgroundColor: 'lightgray' }]} />
            )}
            <Text style={styles.noticeTitle}>{item.title}</Text>
            <Text style={styles.noticeDate}>{item.date}</Text>
          </View>
        )}
      />
      <Link href={'/menu'} style={{margin:10}}><Text style={styles.sectionTitle}>Ирцийн мэдээлэл</Text></Link>

      <FlatList
        data={homework}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.homeworkCard} onPress={() => handleHomeworkPress(item)}>
            <View style={styles.homeworkTextContainer}>
              <View style={{flex:1, flexDirection:'row',justifyContent:'space-between',alignItems:'center', width:280}}>
                <Text style={[styles.homeworkText]}>{item.subject}</Text>
                <Text>{item.teacher}</Text>
              </View>
              <View style={{flex:1, flexDirection:'row',gap:10,alignItems:'center', width:280}}>
                <Text>Ирц</Text>
                <View style={{ width: 200, height: 10, backgroundColor: "#ddd", borderRadius: 5,flex:1,flexDirection:"row",overflow:'hidden' }}>
                  <View style={{ width: `${item.present}%`, height: "100%", backgroundColor: "#00ce90"}} />
                  <View style={{ width: `${item.leave}%`, height: "100%", backgroundColor: "#d4f5ff"}} />
                  <View style={{ width: `${item.absent}%`, height: "100%", backgroundColor: "#fe4f66"}} />
                </View>
              </View>

            </View>
          </TouchableOpacity>
        )}
      />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            {selectedHomework && (
              <>
                <Text style={modalStyles.modalTitle}>{selectedHomework.subject}</Text>
                <Text style={modalStyles.modalText}>Багш: {selectedHomework.teacher}</Text>
                <Text style={modalStyles.modalText}>Ирсэн: {selectedHomework.present}%</Text>
                <Text style={modalStyles.modalText}>Чөлөөтэй: {selectedHomework.leave}%</Text>
                <Text style={modalStyles.modalText}>Тасалсан: {selectedHomework.absent}%</Text>
              </>
            )}
            <TouchableOpacity
              style={[modalStyles.button, modalStyles.buttonClose]}
              onPress={closeModal}
            >
              <Text style={modalStyles.textStyle}>Хаах</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "white"},
    innerContainer:{ flex: 1, padding:16},
    sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#822321", margin: 8 },

    // Notice Board Styles
    noticeCard: { backgroundColor: "#F5F5F5", padding: 12, borderRadius: 10, marginRight: 10, width: 160 },
    noticeImage: { width: "100%", height: 80, alignSelf: "center", borderRadius: 8 },
    noticeTitle: { fontSize: 14, fontWeight: "600", marginTop: 6 },
    noticeDate: { fontSize: 12, color: "gray", marginTop: 2 },

    // Homework Styles
    homeworkCard: { flexDirection: "row", alignItems: "center", backgroundColor: "#F3F4F6", padding: 12, borderRadius: 10, marginBottom: 8 },
    homeworkTextContainer: { marginLeft: 12 },
    homeworkText: { fontSize: 14, fontWeight: "600" },
    completedHomework: { color: "#822321" },
    subjectDate: { fontSize: 12, color: "gray" },
  });

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    width: "100%"
  },
  modalText: {
    marginBottom: 10
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#822321",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  }
});