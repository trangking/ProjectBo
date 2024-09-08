import React, { useState, useEffect, useMemo } from "react";
import { Button, Select, Input, Pagination } from "antd";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { fetchDataByPointRange } from "../firebase/firebase";

const { Option } = Select;

export default function Symptom() {
  const [studentByLevel, setStudentByLevel] = useState({});
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [countByLevel, setCountByLevel] = useState({});

  useEffect(() => {
    fetchDataByPointRange().then((studentsByLevel) => {
      setStudentByLevel(studentsByLevel);
      const counts = {};
      Object.keys(studentsByLevel).forEach((level) => {
        counts[level] = studentsByLevel[level].count;
      });
      setCountByLevel(counts);
    });
  }, []);

  // ใช้ useMemo เพื่อเพิ่มประสิทธิภาพในการกรองข้อมูล
  const filteredStudents = useMemo(() => {
    if (!selectedLevel) return [];

    let students = studentByLevel[selectedLevel]?.students || [];

    if (selectedYear) {
      students = students.filter(
        (student) => student.student_Year === selectedYear
      );
    }

    if (searchText) {
      students = students.filter(
        (student) =>
          student.Name.toLowerCase().includes(searchText.toLowerCase()) ||
          student.studentId.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return students;
  }, [selectedLevel, selectedYear, searchText, studentByLevel]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStudents.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleLevelChange = (level) => {
    setSelectedLevel(level);
    setSearchText("");
    setSelectedYear(null);
    setCurrentPage(1); // รีเซ็ต pagination เมื่อเปลี่ยนระดับ
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setCurrentPage(1); // รีเซ็ต pagination เมื่อเปลี่ยนชั้นปี
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1); // รีเซ็ต pagination เมื่อค้นหา
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <Link to="/MenuAdmin">
        <Button type="link" icon={<ArrowLeftOutlined />} className="mb-4">
          ย้อนกลับ
        </Button>
      </Link>

      <h1 className="text-2xl font-bold mb-6 text-center">
        ประวัติการประเมินนักศึกษาและการเลือกระดับ
      </h1>

      <div className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-center">
          เลือกระดับอาการซึมเศร้า
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {Object.keys(studentByLevel).map((levelKey) => {
            const level = studentByLevel[levelKey].levelInfo;
            return (
              <div
                key={level.level} // ใช้ `level.level` แทนค่าที่ไม่ซ้ำกันแน่นอน
                className="p-4 bg-white shadow-md rounded-lg flex items-center justify-between"
                style={{ borderLeft: `10px solid ${level.color}` }}
              >
                <div>
                  <h2 className="text-lg font-bold">{level.text}</h2>
                  <p className="text-gray-600">
                    ช่วงคะแนน: {level.pointRange[0]} - {level.pointRange[1]}
                  </p>
                  <p className="text-gray-600">
                    จำนวนทั้งหมด: {countByLevel[level.level] || 0} คน
                  </p>
                </div>
                <Button
                  style={{
                    backgroundColor: level.color,
                    color: "white",
                    border: "none",
                  }}
                  onClick={() => handleLevelChange(level.level)}
                >
                  เลือกระดับนี้
                </Button>
              </div>
            );
          })}
        </div>

        {selectedLevel && (
          <div className="mt-8 flex flex-col items-center justify-center">
            <div
              className="w-72 p-4 bg-white shadow-lg rounded-lg border-t-4"
              style={{
                borderTopColor: studentByLevel[selectedLevel]?.levelInfo?.color,
              }}
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                คุณเลือกระดับ:
              </h3>
              <p className="text-lg font-medium text-gray-600">
                {studentByLevel[selectedLevel]?.levelInfo?.text}
              </p>
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                ระบบได้ทำการเลือกข้อมูลตามระดับที่คุณระบุไว้แล้ว
              </p>
            </div>
          </div>
        )}
      </div>

      {selectedLevel && (
        <>
          <div className="flex space-x-4 mb-4">
            <input
              placeholder="ค้นหาตามชื่อหรือรหัสนักศึกษา"
              value={searchText}
              onChange={handleSearchChange}
              className="p-2 border border-gray-300 rounded-lg w-72 h-[32px]"
            />

            <Select
              placeholder="เลือกชั้นปี"
              style={{ width: 150 }}
              value={selectedYear}
              onChange={handleYearChange}
            >
              <Option value={1}>ชั้นปี 1</Option>
              <Option value={2}>ชั้นปี 2</Option>
              <Option value={3}>ชั้นปี 3</Option>
              <Option value={4}>ชั้นปี 4</Option>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-300">
                  <th className="text-left py-2 px-4">ลำดับ</th>
                  <th className="text-left py-2 px-4">ชื่อ-นามสกุล</th>
                  <th className="text-left py-2 px-4">รหัสนักศึกษา</th>
                  <th className="text-left py-2 px-4">คณะ</th>
                  <th className="text-left py-2 px-4">ชั้นปี</th>
                  <th className="text-left py-2 px-4">สาขา</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((record, index) => (
                  <tr
                    key={record.studentId + index} // ใช้ `index` ร่วมกับ `studentId` เพื่อป้องกันปัญหา key ซ้ำ
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-2 px-4">
                      {index + indexOfFirstItem + 1}
                    </td>
                    <td className="py-2 px-4">{record.Name}</td>
                    <td className="py-2 px-4">{record.studentId}</td>
                    <td className="py-2 px-4">{record.faculty}</td>
                    <td className="py-2 px-4">{record.student_Year}</td>
                    <td className="py-2 px-4">{record.major}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center mt-4">
            <Pagination
              current={currentPage}
              pageSize={itemsPerPage}
              total={filteredStudents.length}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </div>
        </>
      )}
    </div>
  );
}
