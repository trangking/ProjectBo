import React, { useState, useEffect } from "react";
import { fetchStudent, fetchDataByPoint } from "../firebase/firebase";
import { Select, Button, Input } from "antd"; // Imported Select, Button, and Input from Ant Design
import { ArrowLeftOutlined } from "@ant-design/icons"; // Imported ArrowLeftOutlined icon
import { Link } from "react-router-dom";

const { Option } = Select;

export default function HistoryStudent({ navigate }) {
  const [searchText, setSearchText] = useState("");
  const [student, setStudent] = useState([]);
  const [dataStudent, setDataStudent] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // State สำหรับการจัดการ pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // กำหนดจำนวนรายการต่อหน้า

  // State สำหรับการเลือกคณะ, ชั้นปี และสาขา
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMajor, setSelectedMajor] = useState(null);

  useEffect(() => {
    fetchStudent().then((data) => {
      setStudent(data);
    });
  }, []);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleYearChange = (value) => {
    setSelectedYear(value);
  };

  const handleFacultyChange = (value) => {
    setSelectedFaculty(value);
  };

  const handleMajorChange = (value) => {
    setSelectedMajor(value);
  };

  const ShowData = (id) => {
    fetchDataByPoint(id).then((item) => {
      setDataStudent(item);
      setIsModalVisible(true);
    });
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const filteredData = student.filter(
    (student) =>
      ((student.firstName && student.firstName.includes(searchText)) ||
        (student.lastName && student.lastName.includes(searchText)) ||
        (student.studentId && student.studentId.includes(searchText))) &&
      (!selectedYear || student.student_year === selectedYear) &&
      (!selectedFaculty || student.faculty === selectedFaculty) &&
      (!selectedMajor || student.major === selectedMajor)
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataStudent.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="p-8 ">
      <Link to="/MenuAdmin" className="w-full">
        <Button type="link" icon={<ArrowLeftOutlined />} className="mb-4">
          ย้อนกลับ
        </Button>
      </Link>

      <h1 className="text-2xl font-bold mb-4">ประวัติการประเมินนักศึกษา</h1>

      {/* Search and filter section */}
      <div className="flex space-x-4 mb-4">
        <Input
          placeholder="ค้นหาตามชื่อหรือรหัสนักศึกษา"
          value={searchText}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded-lg w-72 h-[32px]"
          style={{ width: '20%' }}
        />

        <Select
          placeholder="เลือกคณะ"
          style={{ width: 150 }}
          onChange={handleFacultyChange}
          allowClear
        >
          <Option value="วิทยาศาสตร์">วิทยาศาสตร์</Option>
          <Option value="บริหารธุรกิจ">บริหารธุรกิจ</Option>
          {/* Add more faculty options as needed */}
        </Select>

        <Select
          placeholder="เลือกปีการศึกษา"
          style={{ width: 150 }}
          onChange={handleYearChange}
          allowClear
        >
          <Option value={"2561"}>ปีการศึกษา 2561</Option>
          <Option value={"2562"}>ปีการศึกษา 2562</Option>
          <Option value={"2563"}>ปีการศึกษา 2563</Option>
          <Option value={"2564"}>ปีการศึกษา 2564</Option>
        </Select>

        <Select
          placeholder="เลือกสาขา"
          style={{ width: 150 }}
          onChange={handleMajorChange}
          allowClear
        >
          <Option value="วิทยาการคอมพิวเตอร์">วิทยาการคอมพิวเตอร์</Option>
          <Option value="วิทยาศาสตร์สิ่งแวดล้อม">วิทยาศาสตร์สิ่งแวดล้อม</Option>
          {/* Add more major options as needed */}
        </Select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="text-left py-2 px-4">คำนำหน้า</th>
              <th className="text-left py-2 px-4">ชื่อ-นามสกุล</th>
              <th className="text-left py-2 px-4">รหัสนักศึกษา</th>
              <th className="text-left py-2 px-4">คณะ</th>
              <th className="text-left py-2 px-4">ปีการศึกษา</th>
              <th className="text-left py-2 px-4">สาขา</th>
              <th className="text-left py-2 px-4">ดูข้อมูล</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((record) => (
              <tr
                key={record.studentId}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-2 px-4">{record.title}</td>
                <td className="py-2 px-4">{record.Name}</td>
                <td className="py-2 px-4">{record.studentId}</td>
                <td className="py-2 px-4">{record.faculty}</td>
                <td className="py-2 px-4">{record.student_year}</td>
                <td className="py-2 px-4">{record.major}</td>
                <td className="py-2 px-4">
                  <button
                    className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 transition"
                    onClick={() => ShowData(record.studentId)}
                  >
                    ดูข้อมูลการประเมิน
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalVisible && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full">
            <h2 className="text-xl font-bold mb-4">ข้อมูลการประเมิน</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300">
                    <th className="text-left py-2 px-4">วันที่</th>
                    <th className="text-left py-2 px-4">คณะ</th>
                    <th className="text-left py-2 px-4">ชื่อ</th>
                    <th className="text-left py-2 px-4">สาขา</th>
                    <th className="text-left py-2 px-4">ข้อความ</th>
                    <th className="text-left py-2 px-4">คะแนน</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200">
                      <td className="py-2 px-4">{item.date}</td>
                      <td className="py-2 px-4">{item.faculty}</td>
                      <td className="py-2 px-4">{item.Name}</td>
                      <td className="py-2 px-4">{item.major}</td>
                      <td className="py-2 px-4">{item.message}</td>
                      <td className="py-2 px-4">{item.point}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-center space-x-2">
              {[...Array(Math.ceil(dataStudent.length / itemsPerPage)).keys()].map((number) => (
                <button
                  key={number}
                  onClick={() => handlePageChange(number + 1)}
                  className={`px-4 py-2 rounded-lg ${currentPage === number + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                    }`}
                >
                  {number + 1}
                </button>
              ))}
            </div>

            <div className="mt-4 text-right">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                onClick={handleModalClose}
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
