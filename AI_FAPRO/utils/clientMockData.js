export const mockClients = [
  {
    name: '김민준',
    phone: '010-1234-5678',
    email: 'minjun.kim@email.com',
    age: 45,
    investmentType: '중립형',
    totalAssets: '12억',
    holdings: '삼성전자, SK하이닉스, 펄어비스',
    holdingsDetail: [
      { name: '삼성전자', quantity: 1500, avgPrice: 68000 },
      { name: 'SK하이닉스', quantity: 500, avgPrice: 175000 },
      { name: '펄어비스', quantity: 2000, avgPrice: 38000 }
    ],
    notes: 'AI 반도체 관심 높음',
    joinDate: '2024-01-15'
  },
  {
    name: '이서연',
    phone: '010-2345-6789',
    email: 'seoyeon.lee@email.com',
    age: 38,
    investmentType: '안정형',
    totalAssets: '8억',
    holdings: '삼성바이오로직스, 셀트리온제약',
    holdingsDetail: [
      { name: '삼성바이오로직스', quantity: 100, avgPrice: 820000 },
      { name: '셀트리온제약', quantity: 800, avgPrice: 85000 }
    ],
    notes: '배당주 선호, 리스크 회피 성향',
    joinDate: '2023-11-20'
  },
  {
    name: '박지훈',
    phone: '010-3456-7890',
    email: 'jihoon.park@email.com',
    age: 52,
    investmentType: '공격형',
    totalAssets: '25억',
    holdings: '에코프로비엠, 알테오젠, LG에너지솔루션',
    holdingsDetail: [
      { name: '에코프로비엠', quantity: 300, avgPrice: 195000 },
      { name: '알테오젠', quantity: 200, avgPrice: 265000 },
      { name: 'LG에너지솔루션', quantity: 250, avgPrice: 405000 }
    ],
    notes: '2차전지·바이오 집중 투자',
    joinDate: '2022-06-10'
  },
  {
    name: '최유진',
    phone: '010-4567-8901',
    email: 'yujin.choi@email.com',
    age: 41,
    investmentType: '중립형',
    totalAssets: '15억',
    holdings: '카카오게임즈, 펄어비스, LG화학',
    holdingsDetail: [
      { name: '카카오게임즈', quantity: 3000, avgPrice: 31500 },
      { name: '펄어비스', quantity: 1500, avgPrice: 38000 },
      { name: 'LG화학', quantity: 120, avgPrice: 360000 }
    ],
    notes: '게임주 관심, 분기별 리밸런싱',
    joinDate: '2023-03-22'
  },
  {
    name: '정현우',
    phone: '010-5678-9012',
    email: 'hyunwoo.jung@email.com',
    age: 49,
    investmentType: '공격형',
    totalAssets: '18억',
    holdings: 'SK하이닉스, 에코프로비엠, 알테오젠',
    holdingsDetail: [
      { name: 'SK하이닉스', quantity: 800, avgPrice: 165000 },
      { name: '에코프로비엠', quantity: 400, avgPrice: 185000 },
      { name: '알테오젠', quantity: 150, avgPrice: 270000 }
    ],
    notes: 'HBM 테마 장기 보유 전략',
    joinDate: '2023-09-05'
  },
  {
    name: '강지은',
    phone: '010-6789-0123',
    email: 'jieun.kang@email.com',
    age: 36,
    investmentType: '안정형',
    totalAssets: '6억',
    holdings: '삼성전자, 삼성바이오로직스',
    holdingsDetail: [
      { name: '삼성전자', quantity: 2000, avgPrice: 70000 },
      { name: '삼성바이오로직스', quantity: 80, avgPrice: 850000 }
    ],
    notes: '대형우량주 중심, 월 적립식',
    joinDate: '2024-02-01'
  }
]

export const currentPrices = {
  삼성전자: 73500,
  SK하이닉스: 192000,
  펄어비스: 42500,
  삼성바이오로직스: 895000,
  셀트리온제약: 92300,
  에코프로비엠: 178500,
  알테오젠: 285000,
  LG에너지솔루션: 428000,
  카카오게임즈: 34850,
  LG화학: 387000
}

export const aiSearchExamples = [
  '안정형 고객 중 자산 5억 이상 고객 찾아줘',
  '공격투자형 고객 중 2차전지 관심 있는 고객 찾아줘',
  '바이오 섹터 보유 중인 공격형 고객 검색',
  '게임주 보유하고 있는 중립형 고객'
]
