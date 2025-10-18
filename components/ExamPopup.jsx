import { useState } from "react";
import { LuGraduationCap } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";

/*=====================
  ثابتات البيانات
=====================*/
const YEARS = [
  "الفرقة الأولى",
  "الفرقة الثانية",
  "الفرقة الثالثة",
  "الفرقة الرابعة",
];
const TERMS = ["الترم الأول", "الترم الثاني"];

const SUBJECTS = {
  "الفرقة الأولى": {
    "الترم الأول": [
      "النظم السياسية",
      "المنظمات الدولية",
      "تاريخ القانون",
      {
        name: "المدخل للعلوم القانونية",
        subs: ["نظرية الحق", "نظرية القانون"],
      },
      { name: "علم الاجرام و العقاب", subs: ["علم الاجرام", "علم العقاب"] },
      { name: "مصطلحات اجنبية", subs: ["انجلش", "فرنش"] },
    ],
    "الترم الثاني": [
      "قانون دستورى",
      "الشريعة الاسلامية",
      "الاحوال الشخصية لغير المسلمين",
      "مبادئ الاقتصاد",
      "اصول البحث القانونى",
      "القانون الانجلوامريكى",
      "التفكير النقدى",
    ],
  },
  "الفرقة الثانية": {
    "الترم الأول": [
      "قانون الاثبات",
      { name: "نقود و بنوك", subs: ["نقود", "بنوك"] },
      { name: "الشريعة الاسلامية", subs: ["زواج", "طلاق"] },
      { name: "مصطلحات أجنبية", subs: ["إنجلش", "فرنش"] },
      "ريادة اعمال",
    ],
    "الترم الثاني": [
      "القانون الدولى العام",
      "القانون الادارى",
      "قانون العقوبات",
      { name: "القانون المدنى", subs: ["احكام الالتزام", "مصادر الالتزام"] },
      "تاريخ القانون المصرى",
    ],
  },
  "الفرقة الثالثة": {
    "الترم الأول": [
      { name: "القانون المدنى", subs: ["البيع", "الايجار", "التأمين"] },
      { name: "القانون الدولى", subs: ["مركز الاجانب", "الجنسية"] },
      "قانون العمل",
      "المالية العامة",
    ],
    "الترم الثاني": [
      {
        name: "القانون الجنائى الخاص",
        subs: ["جرائم الاشخاص", "المصلحة العامة", "جرائم الاموال"],
      },
      { name: "مصطلحات اجنبية", subs: ["انجلش", "فرنش"] },
      { name: "الشريعة الاسلامية", subs: ["وصية", "مواريث"] },
      { name: "القانون التجارى", subs: ["شركات", "اعمال"] },
      "قضاء ادارى و دستورى",
      "قانون المرافعات",
    ],
  },
  "الفرقة الرابعة": {
    "الترم الأول": [
      "القانون البحرى",
      "القانون الجوى",
      "اصول الفقة",
      "التشريعات الاجتماعية",
      { name: "مصطلحات اجنبية", subs: ["فرنش", "انجلش"] },
    ],
    "الترم الثاني": [
      "القانون الدولى الخاص",
      "التنفيذ الجبرى",
      "التشريع الضريبى",
      "القانون التجارى",
      "الاجراءات الجنائية",
      "القانون المدنى",
    ],
  },
};

/*=====================
  ExamPopup Component
=====================*/
const ExamPopup = ({ showPopup, setShowPopup }) => {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedSubOption, setSelectedSubOption] = useState(null);

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-primary dark:bg-darkPrimary rounded-2xl p-6 w-[90%] max-w-md shadow-lg max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center text-secondary mb-4">
              <div className="flex items-center gap-2 text-xl">
                <LuGraduationCap className="text-2xl" />
                <h2>Exams</h2>
              </div>
              <IoClose
                className="text-2xl cursor-pointer"
                onClick={() => {
                  setShowPopup(false);
                  setSelectedYear("");
                  setSelectedTerm("");
                  setSelectedSubject(null);
                  setSelectedSubOption(null);
                }}
              />
            </div>

            {/* Select Year */}
            <div className="mb-4">
              <p className="font-medium mb-2 text-secondary">اختر الفرقة</p>
              <div className="grid grid-cols-2 gap-2">
                {YEARS.map((year) => (
                  <button
                    key={year}
                    onClick={() => {
                      setSelectedYear(year);
                      setSelectedTerm("");
                      setSelectedSubject(null);
                      setSelectedSubOption(null);
                    }}
                    className={`py-2 rounded-lg transition ${
                      selectedYear === year
                        ? "bg-secondary text-darkPrimary"
                        : "bg-gray-200 dark:bg-darkSecondary dark:text-secondary"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            {/* Select Term */}
            {selectedYear && (
              <div className="mb-4">
                <p className="font-medium mb-2 text-secondary">اختر الترم</p>
                <div className="flex gap-3">
                  {TERMS.map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setSelectedTerm(term);
                        setSelectedSubject(null);
                        setSelectedSubOption(null);
                      }}
                      className={`flex-1 py-2 rounded-lg transition ${
                        selectedTerm === term
                          ? "bg-secondary text-darkPrimary"
                          : "bg-gray-200 dark:bg-darkSecondary dark:text-secondary"
                      }`}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Select Subject */}
            {selectedYear && selectedTerm && (
              <div className="mt-4">
                <p className="font-medium mb-2 text-secondary">اختر المادة</p>
                <div className="grid grid-cols-1 gap-2">
                  {SUBJECTS[selectedYear][selectedTerm].map(
                    (subject, index) => {
                      const isObject = typeof subject === "object";
                      const isOpen =
                        isObject && selectedSubject?.name === subject.name;
                      const isSelected =
                        (!isObject && selectedSubject === subject) ||
                        (isObject && selectedSubject?.name === subject.name);

                      return (
                        <div key={index}>
                          <button
                            onClick={() => {
                              if (isObject) {
                                setSelectedSubject(subject);
                                if (isOpen) {
                                  setSelectedSubject(null);
                                  setSelectedSubOption(null);
                                }
                              } else {
                                setSelectedSubject(subject);
                                setSelectedSubOption(null);
                              }
                            }}
                            className={`w-full py-2 rounded-lg transition ${
                              isSelected
                                ? "bg-secondary text-darkPrimary"
                                : "bg-gray-200 dark:bg-darkSecondary dark:text-secondary"
                            }`}
                          >
                            {isObject ? subject.name : subject}
                          </button>

                          {/* Sub-options */}
                          {isOpen && (
                            <div className="mt-2 w-[90%] mx-auto flex gap-2">
                              {subject.subs.map((sub, i) => (
                                <button
                                  key={i}
                                  onClick={() => setSelectedSubOption(sub)}
                                  className={`w-full py-1.5 rounded-lg text-sm transition ${
                                    selectedSubOption === sub
                                      ? "bg-secondary text-darkPrimary"
                                      : "bg-gray-100 dark:bg-darkSecondary/80 dark:text-secondary"
                                  }`}
                                >
                                  {sub}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            )}

            {/* Start Exam Button */}
            {(selectedSubject || selectedSubOption) && (
              <div className="mt-6">
                <button
                  onClick={() => toast("🚀 Coming soon...")}
                  className="w-full bg-secondary text-darkPrimary py-2.5 rounded-lg font-semibold hover:opacity-90 transition"
                >
                  بدء الامتحان
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ExamPopup;
