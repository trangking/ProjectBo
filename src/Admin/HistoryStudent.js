import React, { useState, useEffect } from "react";
import { Input, Table, Modal } from "antd";
import { fetchStudent, fetchDataByPoint } from "../firebase/firebase";
import { Button } from "antd/es/radio";

export default function HistoryStudent() {
  const [searchText, setSearchText] = useState("");
  const [student, setStudent] = useState([]);
  const [dataStudent, setDataStudent] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchStudent().then((data) => {
      setStudent(data);
    });
  }, []);

  const columns = [
    {
      title: "คำนำหน้า",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "ชื่อ",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "นามสกุล",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "รหัสนักศึกษา",
      dataIndex: "studentId",
      key: "studentId",
    },
    {
      title: "คณะ",
      dataIndex: "faculty",
      key: "faculty",
    },
    {
      title: "สาขา",
      dataIndex: "major",
      key: "major",
    },
    {
      title: "ดูข้อมูล",
      key: "action",
      render: (text, record) => (
        <Button onClick={() => ShowData(record.studentId)}>
          ดูข้อมูลการประเมิน
        </Button>
      ),
    },
  ];

  const modalColumns = [
    {
      title: "วันที่",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "คณะ",
      dataIndex: "faculty",
      key: "faculty",
    },
    {
      title: "ชื่อ",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "นามสกุล",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "สาขา",
      dataIndex: "major",
      key: "major",
    },
    {
      title: "ข้อความ",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "คะแนน",
      dataIndex: "point",
      key: "point",
    },
  ];

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const ShowData = (id) => {
    fetchDataByPoint(id).then((item) => {
      setDataStudent(item); // Set the fetched student data
      setIsModalVisible(true); // Show the modal when data is available
    });
  };

  const handleModalClose = () => {
    setIsModalVisible(false); // Close the modal when clicking the "Close" button
  };

  const filteredData = student.filter(
    (student) =>
      (student.firstName && student.firstName.includes(searchText)) ||
      (student.lastName && student.lastName.includes(searchText)) ||
      (student.studentId && student.studentId.includes(searchText))
  );

  return (
    <div className="p-8">
      <h1
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}
      >
        ประวัติการประเมินนักศึกษา
      </h1>

      <Input
        placeholder="ค้นหาตามชื่อหรือรหัสนักศึกษา"
        value={searchText}
        onChange={handleSearch}
        style={{ marginBottom: "20px", width: "300px" }}
      />

      <Table
        dataSource={filteredData}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title="ข้อมูลการประเมิน"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
      >
        {/* Display the student data as a table in the modal */}
        <Table
          className="w-full"
          dataSource={dataStudent} // Pass the fetched data as dataSource
          columns={modalColumns} // Use the defined modal columns
          pagination={false} // Disable pagination in the modal
        />
      </Modal>
    </div>
  );
}
