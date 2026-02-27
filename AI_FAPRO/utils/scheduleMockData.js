export const events = [
  {
    id: 1,
    title: '고객 미팅: 김민준',
    startTime: '10:00',
    endTime: '11:00',
    date: new Date(2026, 1, 18),
    type: '미팅',
    color: 'bg-blue-500',
    location: '본사 회의실 A',
    attendees: ['김민준', '박지영']
  },
  {
    id: 2,
    title: '실적발표 컨퍼런스 콜: MNDY',
    startTime: '14:00',
    endTime: '14:30',
    date: new Date(2026, 1, 18),
    type: '리서치',
    color: 'bg-purple-500',
    location: '온라인',
    attendees: ['리서치팀']
  },
  {
    id: 3,
    title: '포트폴리오 검토: 이서연',
    startTime: '09:00',
    endTime: '10:00',
    date: new Date(2026, 1, 19),
    type: '미팅',
    color: 'bg-blue-500',
    location: '강남 지점',
    attendees: ['이서연']
  },
  {
    id: 4,
    title: '팀 회의',
    startTime: '15:00',
    endTime: '16:00',
    date: new Date(2026, 1, 18),
    type: '미팅',
    color: 'bg-green-500',
    location: '본사 회의실 B',
    attendees: ['팀원 전체']
  },
  {
    id: 5,
    title: '중소형주 리서치 발표',
    startTime: '11:00',
    endTime: '12:00',
    date: new Date(2026, 1, 20),
    type: '리서치',
    color: 'bg-purple-500',
    location: '대강당',
    attendees: ['전체 FA']
  },
  {
    id: 6,
    title: '고객 미팅: 최유진',
    startTime: '13:00',
    endTime: '14:00',
    date: new Date(2026, 1, 19),
    type: '미팅',
    color: 'bg-blue-500',
    location: '스타벅스 역삼점',
    attendees: ['최유진']
  },
  {
    id: 7,
    title: '시장 분석 세미나',
    startTime: '16:00',
    endTime: '17:30',
    date: new Date(2026, 1, 20),
    type: '리서치',
    color: 'bg-purple-500',
    location: '본사 세미나실',
    attendees: ['전체']
  }
]

export const myCalendars = [
  { id: 'meeting', name: '고객 미팅', color: 'bg-blue-500', checked: true },
  { id: 'research', name: '리서치', color: 'bg-purple-500', checked: true },
  { id: 'team', name: '팀 일정', color: 'bg-green-500', checked: true }
]
