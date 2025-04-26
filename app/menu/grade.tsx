import { Stack, useRouter } from 'expo-router';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import React, { useState, useMemo } from 'react';
import * as Print from 'expo-print';

interface Assignment {
  id: string;
  type: 'Лаборатори' | 'Бие даалт';
  title: string;
  grade: number;
  maxGrade: number;
}

interface SubjectGrades {
  subject: string;
  attendancePercentage: number;
  assignments: Assignment[];
}

const gradesData: SubjectGrades[] = [
  {
    subject: 'Өгөгдлийн бүтэц',
    attendancePercentage: 85,
    assignments: [
      { id: '1', type: 'Лаборатори', title: 'Бүлэг 1', grade: 90, maxGrade: 100 },
      { id: '2', type: 'Бие даалт', title: 'Модуль 1', grade: 85, maxGrade: 100 },
      { id: '3', type: 'Лаборатори', title: 'Бүлэг 2', grade: 92, maxGrade: 100 },
    ],
  },
  {
    subject: 'Алгоритм',
    attendancePercentage: 92,
    assignments: [
      { id: '4', type: 'Лаборатори', title: 'Бүлэг 1', grade: 78, maxGrade: 100 },
      { id: '5', type: 'Бие даалт', title: 'Модуль 1', grade: 92, maxGrade: 100 },
    ],
  },
  {
    subject: 'Объект хандалтат програмчлал',
    attendancePercentage: 78,
    assignments: [
      { id: '6', type: 'Лаборатори', title: 'Бүлэг 1', grade: 88, maxGrade: 100 },
      { id: '7', type: 'Бие даалт', title: 'Модуль 1', grade: 95, maxGrade: 100 },
      { id: '8', type: 'Лаборатори', title: 'Бүлэг 2', grade: 80, maxGrade: 100 },
      { id: '9', type: 'Бие даалт', title: 'Модуль 2', grade: 90, maxGrade: 100 },
    ],
  },
  {
    subject: 'Веб хөгжүүлэлт',
    attendancePercentage: 60,
    assignments: [
      { id: '10', type: 'Лаборатори', title: 'Бүлэг 1', grade: 65, maxGrade: 100 },
      { id: '11', type: 'Бие даалт', title: 'Төсөл 1', grade: 75, maxGrade: 100 },
    ],
  },
  {
    subject: 'Мобиль програмчлал',
    attendancePercentage: 98,
    assignments: [
      { id: '12', type: 'Лаборатори', title: 'Бүлэг 1', grade: 95, maxGrade: 100 },
      { id: '13', type: 'Бие даалт', title: 'Төсөл 1', grade: 88, maxGrade: 100 },
      { id: '14', type: 'Лаборатори', title: 'Бүлэг 2', grade: 92, maxGrade: 100 },
    ],
  },
  {
    subject: 'Компьютерийн сүлжээ',
    attendancePercentage: 70,
    assignments: [
      { id: '15', type: 'Лаборатори', title: 'Сүлжээний үндэс', grade: 80, maxGrade: 100 },
      { id: '16', type: 'Бие даалт', title: 'Сүлжээний төсөл', grade: 70, maxGrade: 100 },
    ],
  },
  {
    subject: 'Хиймэл оюун ухаан',
    attendancePercentage: 88,
    assignments: [
      { id: '17', type: 'Лаборатори', title: 'Нейрон сүлжээ', grade: 95, maxGrade: 100 },
      { id: '18', type: 'Бие даалт', title: 'Машин сургалт', grade: 85, maxGrade: 100 },
    ],
  },
];

interface SubjectItemProps {
  item: SubjectGrades;
  onPress: (subjectData: SubjectGrades) => void;
}

const SubjectItem: React.FC<SubjectItemProps> = ({ item, onPress }) => {
  const totalPercentage = useMemo(() => {
    if (item.assignments.length === 0) {
      return '0%';
    }
    const totalGrade = item.assignments.reduce((sum, assignment) => sum + assignment.grade, 0);
    const totalMaxGrade = item.assignments.reduce((sum, assignment) => sum + assignment.maxGrade, 0);
    return totalMaxGrade > 0 ? ((totalGrade / totalMaxGrade) * 100).toFixed(2) + '%' : '0%';
  }, [item.assignments]);

  return (
    <TouchableOpacity style={styles.subjectItem} onPress={() => onPress(item)}>
      <Text style={styles.subjectTitle}>{item.subject}</Text>
      <Text style={styles.totalGradeText}>Нийт дүн: {totalPercentage}</Text>
    </TouchableOpacity>
  );
};

interface AssignmentItemProps {
  item: Assignment;
}

const AssignmentItem: React.FC<AssignmentItemProps> = ({ item }) => (
  <View style={modalStyles.assignmentItem}>
    <Text>{item.title} ({item.type})</Text>
    <Text>Дүн: {item.grade}/{item.maxGrade}</Text>
  </View>
);

export default function SubjectDetailsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSubjectData, setSelectedSubjectData] = useState<SubjectGrades | null>(null);

  const handleSubjectPress = (subjectData: SubjectGrades) => {
    setSelectedSubjectData(subjectData);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedSubjectData(null);
  };

  const generatePrintHTML = (data: SubjectGrades[]): string => {
    let html = `
      <html>
        <head>
          <style>
            body { font-family: sans-serif; }
            h1 { text-align: center; }
            h2 { margin-top: 20px; }
            .subject-info { margin-bottom: 10px; }
            .assignment-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            .assignment-table th, .assignment-table td { border: 1px solid black; padding: 8px; text-align: left; }
            .assignment-table th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>Хичээлийн Дэлгэрэнгүй Дүн</h1>
    `;

    data.forEach(subject => {
      const totalGrade = subject.assignments.reduce((sum, assignment) => sum + assignment.grade, 0);
      const totalMaxGrade = subject.assignments.reduce((sum, assignment) => sum + assignment.maxGrade, 0);
      const percentage = totalMaxGrade > 0 ? ((totalGrade / totalMaxGrade) * 100).toFixed(2) + '%' : '0%';

      html += `
        <h2>${subject.subject}</h2>
        <div class="subject-info">
          <p><strong>Нийт дүн:</strong> ${percentage} (${totalGrade}/${totalMaxGrade})</p>
          <p><strong>Ирц:</strong> ${subject.attendancePercentage}%</p>
        </div>
        <h3>Даалгаврууд:</h3>
        <table class="assignment-table">
          <thead>
            <tr>
              <th>Төрөл</th>
              <th>Нэр</th>
              <th>Дүн</th>
            </tr>
          </thead>
          <tbody>
      `;
      subject.assignments.forEach(assignment => {
        html += `
            <tr>
              <td>${assignment.type}</td>
              <td>${assignment.title}</td>
              <td>${assignment.grade}/${assignment.maxGrade}</td>
            </tr>
        `;
      });
      html += `
          </tbody>
        </table>
      `;
    });

    html += `
        </body>
      </html>
    `;
    return html;
  };

  const handlePrint = async () => {
    const htmlContent = generatePrintHTML(gradesData);
    await Print.printAsync({
      html: htmlContent,
    });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        title: "Хичээлийн Дэлгэрэнгүй"
      }} />
      <FlatList
        data={gradesData}
        keyExtractor={(item) => item.subject}
        renderItem={({ item }) => <SubjectItem item={item} onPress={handleSubjectPress} />}
      />

      <TouchableOpacity style={printStyles.printButton} onPress={handlePrint}>
        <Text style={printStyles.printButtonText}>Хэвлэх</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            {selectedSubjectData && (
              <>
                <Text style={modalStyles.modalTitle}>{selectedSubjectData.subject}</Text>
                <Text style={modalStyles.attendance}>Ирц: {selectedSubjectData.attendancePercentage}%</Text>
                <Text style={modalStyles.subtitle}>Лабораторийн болон Бие Даалтын Дүн:</Text>
                <FlatList
                  data={selectedSubjectData.assignments}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => <AssignmentItem item={item} />}
                />
              </>
            )}
            <TouchableOpacity style={[modalStyles.button, modalStyles.buttonClose]} onPress={closeModal}>
              <Text style={modalStyles.textStyle}>Хаах</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  subjectItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  subjectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  totalGradeText: {
    fontSize: 14,
    color: '#822321',
    fontWeight: 'bold',
  },
});

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  attendance: {
    fontSize: 16,
    marginBottom: 10,
    color: '#822321',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  assignmentItem: {
    marginBottom: 8,
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: '#822321',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20,
  },
  buttonClose: {
    backgroundColor: '#822321',
    alignSelf: 'flex-end',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const printStyles = StyleSheet.create({
  printButton: {
    backgroundColor: '#822321',
    paddingVertical: 15,
    borderRadius: 8,
    margin: 16,
    alignItems: 'center',
  },
  printButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});