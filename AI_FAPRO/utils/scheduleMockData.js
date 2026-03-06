const baseEvents = [
  {
    id: 1,
    title: "포트폴리오 점검 미팅",
    startTime: "10:30",
    endTime: "11:30",
    date: new Date(2026, 2, 3),
    type: "고객 미팅",
    color: "bg-blue-500",
    location: "회의실 A",
    attendees: ["김민준"]
  },
  {
    id: 2,
    title: "신규 투자 상담",
    startTime: "14:00",
    endTime: "15:00",
    date: new Date(2026, 2, 4),
    type: "상담",
    color: "bg-teal-500",
    location: "VIP룸",
    attendees: ["박지영"]
  },
  {
    id: 3,
    title: "은퇴자산 상담",
    startTime: "11:00",
    endTime: "12:00",
    date: new Date(2026, 2, 5),
    type: "상담",
    color: "bg-amber-500",
    location: "상담실 1",
    attendees: ["이서연"]
  },
  {
    id: 4,
    title: "채권 투자 상담",
    startTime: "15:00",
    endTime: "16:00",
    date: new Date(2026, 2, 6),
    type: "상담",
    color: "bg-purple-500",
    location: "본사",
    attendees: ["최유진"]
  },
  {
    id: 5,
    title: "보유종목 리뷰",
    startTime: "11:30",
    endTime: "12:30",
    date: new Date(2026, 2, 9),
    type: "리뷰",
    color: "bg-blue-500",
    location: "온라인",
    attendees: ["강현우"]
  },
  {
    id: 6,
    title: "신규 계좌 상담",
    startTime: "10:00",
    endTime: "11:00",
    date: new Date(2026, 2, 10),
    type: "상담",
    color: "bg-teal-500",
    location: "지점 창구",
    attendees: ["정다은"]
  },
  {
    id: 7,
    title: "배당주 포트폴리오 상담",
    startTime: "15:30",
    endTime: "16:30",
    date: new Date(2026, 2, 11),
    type: "상담",
    color: "bg-amber-500",
    location: "상담실 2",
    attendees: ["송지훈"]
  },
  {
    id: 8,
    title: "자산배분 상담",
    startTime: "11:00",
    endTime: "12:00",
    date: new Date(2026, 2, 12),
    type: "상담",
    color: "bg-purple-500",
    location: "본사",
    attendees: ["한예지"]
  },
  {
    id: 101,
    title: "고객 미팅 (임시)",
    startTime: "09:00",
    endTime: "10:00",
    date: new Date(2026, 2, 12),
    type: "고객 미팅",
    color: "bg-blue-500",
    location: "회의실 A"
  },
  {
    id: 102,
    title: "상담 (임시)",
    startTime: "13:00",
    endTime: "14:00",
    date: new Date(2026, 2, 12),
    type: "상담",
    color: "bg-teal-500",
    location: "VIP룸"
  },
  {
    id: 103,
    title: "리뷰 (임시)",
    startTime: "15:00",
    endTime: "16:00",
    date: new Date(2026, 2, 12),
    type: "리뷰",
    color: "bg-amber-500",
    location: "온라인"
  },
  {
    id: 104,
    title: "리서치 (임시)",
    startTime: "17:00",
    endTime: "18:00",
    date: new Date(2026, 2, 12),
    type: "리서치",
    color: "bg-purple-500",
    location: "자료실"
  },
  {
    id: 9,
    title: "ETF 투자 상담",
    startTime: "11:00",
    endTime: "12:00",
    date: new Date(2026, 2, 16),
    type: "상담",
    color: "bg-blue-500",
    location: "카페 아틀리에",
    attendees: ["오세훈"]
  },
  {
    id: 10,
    title: "해외주식 상담",
    startTime: "11:30",
    endTime: "12:30",
    date: new Date(2026, 2, 18),
    type: "상담",
    color: "bg-teal-500",
    location: "온라인 Zoom",
    attendees: ["임채원"]
  },
  {
    id: 11,
    title: "채권 투자 전략 상담",
    startTime: "10:30",
    endTime: "11:30",
    date: new Date(2026, 2, 19),
    type: "상담",
    color: "bg-amber-500",
    location: "본사 2층",
    attendees: ["고준서"]
  },
  {
    id: 12,
    title: "신규 투자 미팅",
    startTime: "11:00",
    endTime: "12:00",
    date: new Date(2026, 2, 23),
    type: "고객 미팅",
    color: "bg-purple-500",
    location: "상담실 C",
    attendees: ["배현아"]
  },
  {
    id: 13,
    title: "은퇴 준비 상담",
    startTime: "10:30",
    endTime: "11:30",
    date: new Date(2026, 2, 24),
    type: "상담",
    color: "bg-blue-500",
    location: "VIP라운지",
    attendees: ["전민호"]
  },
  {
    id: 14,
    title: "포트폴리오 리밸런싱",
    startTime: "14:00",
    endTime: "15:00",
    date: new Date(2026, 2, 26),
    type: "리뷰",
    color: "bg-teal-500",
    location: "본사 회의실",
    attendees: ["유지상"]
  },
  {
    id: 15,
    title: "월말 포트폴리오 점검",
    startTime: "11:00",
    endTime: "12:00",
    date: new Date(2026, 2, 30),
    type: "리뷰",
    color: "bg-amber-500",
    location: "상담실 B",
    attendees: ["조성우"]
  }
];

export const events = [...baseEvents];

export const myCalendars = [
  { id: "meeting", name: "고객 미팅", color: "bg-blue-500", checked: true },
  { id: "consultation", name: "상담", color: "bg-teal-500", checked: true },
  { id: "review", name: "리뷰", color: "bg-amber-500", checked: true },
  { id: "research", name: "리서치", color: "bg-purple-500", checked: true }
];
