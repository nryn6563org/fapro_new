export const aiIssueKeywords = [
  { keyword: '호텔', color: 'bg-red-500', size: 120, left: '15%', top: '25%' },
  { keyword: '여행', color: 'bg-red-500', size: 140, left: '52%', top: '45%' },
  { keyword: '우주항공', color: 'bg-blue-500', size: 110, left: '35%', top: '50%' },
  { keyword: '조선', color: 'bg-blue-500', size: 100, left: '32%', top: '22%' },
  { keyword: '방산', color: 'bg-blue-500', size: 95, left: '40%', top: '70%' },
  { keyword: '카지노', color: 'bg-red-400', size: 85, left: '25%', top: '5%' },
  { keyword: '건설', color: 'bg-blue-500', size: 80, left: '60%', top: '15%' },
  { keyword: '자동차', color: 'bg-blue-500', size: 85, left: '70%', top: '32%' },
  { keyword: '전력설비', color: 'bg-blue-500', size: 75, left: '5%', top: '38%' },
  { keyword: '토지자산', color: 'bg-blue-400', size: 72, left: '48%', top: '5%' },
  { keyword: '2차전지', color: 'bg-blue-500', size: 65, left: '10%', top: '60%' },
  { keyword: '반도체', color: 'bg-blue-500', size: 65, left: '53%', top: '75%' },
  { keyword: '원전', color: 'bg-blue-500', size: 62, left: '60%', top: '65%' },
  { keyword: '증권', color: 'bg-blue-400', size: 58, left: '75%', top: '60%' },
  { keyword: '풍력', color: 'bg-blue-400', size: 58, left: '75%', top: '45%' },
  { keyword: '자율주행', color: 'bg-blue-400', size: 55, left: '32%', top: '80%' },
  { keyword: '의료기기', color: 'bg-blue-400', size: 55, left: '18%', top: '78%' },
  { keyword: '은행', color: 'bg-red-400', size: 60, left: '12%', top: '12%' },
  { keyword: '태양광', color: 'bg-red-300', size: 55, left: '3%', top: '22%' }
]

export const keywordDetails = {
  여행: {
    title: '여행',
    timeSeriesData: [
      { date: '01/05', searchIndex: -5, searchVolume: 71 },
      { date: '01/12', searchIndex: 5, searchVolume: 75 },
      { date: '01/19', searchIndex: 0, searchVolume: 73 },
      { date: '01/26', searchIndex: 2, searchVolume: 74 },
      { date: '02/02', searchIndex: 45, searchVolume: 93 }
    ],
    relatedStocks: [
      { name: '모두투어', code: '080160', change: 29.98, cumReturn: 104 },
      { name: '광명전기', code: '047770', change: 7.62, cumReturn: 93 },
      { name: '롯데관광개발', code: '032350', change: 5.4, cumReturn: 82 },
      { name: '하나투어', code: '039130', change: 4.44, cumReturn: 71 }
    ],
    news: [
      { title: '\'최저 9일\' 설 연휴 일본·중국 \'가격\'...여행업계, 추가 모객 \'총력\'', time: '10분 전', source: '연합뉴스' }
    ]
  },
  호텔: {
    title: '호텔',
    timeSeriesData: [
      { date: '01/05', searchIndex: -3, searchVolume: 68 },
      { date: '01/12', searchIndex: 8, searchVolume: 78 },
      { date: '01/19', searchIndex: 2, searchVolume: 72 },
      { date: '01/26', searchIndex: 5, searchVolume: 75 },
      { date: '02/02', searchIndex: 38, searchVolume: 88 }
    ],
    relatedStocks: [
      { name: '호텔신라', code: '008770', change: 7.3, cumReturn: 98 },
      { name: '파라다이스', code: '034230', change: 5.9, cumReturn: 85 },
      { name: '하나투어', code: '039130', change: 4.8, cumReturn: 73 }
    ],
    news: [
      { title: '호텔 객실 가동률 90% 돌파...관광 업황 호조', time: '15분 전', source: '이데일리' }
    ]
  },
  우주항공: {
    title: '우주항공',
    timeSeriesData: [
      { date: '01/05', searchIndex: -8, searchVolume: 62 },
      { date: '01/12', searchIndex: 3, searchVolume: 73 },
      { date: '01/19', searchIndex: 0, searchVolume: 70 },
      { date: '01/26', searchIndex: 10, searchVolume: 80 },
      { date: '02/02', searchIndex: 52, searchVolume: 102 }
    ],
    relatedStocks: [
      { name: '한화에어로스페이스', code: '012450', change: 9.2, cumReturn: 112 },
      { name: 'LIG넥스원', code: '079550', change: 7.8, cumReturn: 95 },
      { name: '퍼스텍', code: '010820', change: 6.5, cumReturn: 88 }
    ],
    news: [
      { title: '한국형 발사체 누리호 3차 발사 성공', time: '20분 전', source: '연합뉴스' }
    ]
  }
}

export const reportStocks = [
  {
    name: '삼성전자',
    code: '005930',
    change: 2.3,
    datetime: '01-30 14:23',
    summary: '반도체 업황 회복과 AI 수요 증가로 실적 개선 전망'
  },
  {
    name: '현대차',
    code: '005380',
    change: -1.2,
    datetime: '01-30 11:15',
    summary: '전기차 시장 둔화 우려, 하지만 신규 모델 출시로 반등 기대'
  },
  {
    name: 'NAVER',
    code: '035420',
    change: -0.5,
    datetime: '01-29 16:47',
    summary: '검색 플랫폼 안정성과 AI 투자로 장기 성장 동력 확보'
  },
  {
    name: '카카오',
    code: '035720',
    change: 3.1,
    datetime: '01-29 09:32',
    summary: '플랫폼 광고 매출 호조, 게임 부문 실적 개선 지속'
  },
  {
    name: 'SK하이닉스',
    code: '000660',
    change: 4.5,
    datetime: '01-28 15:20',
    summary: 'HBM 메모리 시장 주도로 초호황 실적 예상'
  }
]

export const signalStocks = [
  { name: '카카오뱅크', code: '323410', signal: '매수', buyPrice: 28500, currentPrice: 29200, profitRate: 2.5, signalTime: '14:23' },
  { name: 'SK하이닉스', code: '000660', signal: '매수', buyPrice: 132000, currentPrice: 135000, profitRate: 2.3, signalTime: '11:45' },
  { name: 'LG에너지솔루션', code: '373220', signal: '매도', buyPrice: 420000, sellPrice: 445000, profitRate: 5.9, signalTime: '10:15' },
  { name: '삼성바이오로직스', code: '207940', signal: '매도', buyPrice: 870000, sellPrice: 895000, profitRate: 2.9, signalTime: '09:30' }
]

export const quantStocksData = {
  talos: {
    returns: { '1m': 15.8, '3m': 24.5, total: 52.8 },
    stocks: [
      { rank: 1, name: '에코프로비엠', code: '247540', profitRate: 28.5 },
      { rank: 2, name: '포스코퓨처엠', code: '003670', profitRate: 24.3 },
      { rank: 3, name: 'LG에너지솔루션', code: '373220', profitRate: 18.7 },
      { rank: 4, name: '엘앤에프', code: '066970', profitRate: 15.2 },
      { rank: 5, name: '코스모신소재', code: '005070', profitRate: 12.8 }
    ]
  },
  roland: {
    returns: { '1m': 5.2, '3m': 8.7, total: 23.6 },
    stocks: [
      { rank: 1, name: 'KB금융', code: '105560', profitRate: 12.4 },
      { rank: 2, name: '신한지주', code: '055550', profitRate: 11.8 },
      { rank: 3, name: '하나금융지주', code: '086790', profitRate: 10.5 },
      { rank: 4, name: '우리금융지주', code: '316140', profitRate: 9.3 },
      { rank: 5, name: '삼성화재', code: '000810', profitRate: 8.7 }
    ]
  },
  mistral: {
    returns: { '1m': 7.3, '3m': 12.4, total: 31.5 },
    stocks: [
      { rank: 1, name: '삼성전자', code: '005930', profitRate: 15.3 },
      { rank: 2, name: 'SK하이닉스', code: '000660', profitRate: 13.6 },
      { rank: 3, name: '현대차', code: '005380', profitRate: 12.1 },
      { rank: 4, name: '기아', code: '000270', profitRate: 11.5 },
      { rank: 5, name: '삼성SDI', code: '006400', profitRate: 10.8 }
    ]
  }
}

export const customerRankingData = {
  return: [
    { rank: 1, name: '김철수', return: 45.2, asset: 1250000000 },
    { rank: 2, name: '이영희', return: 38.7, asset: 850000000 },
    { rank: 3, name: '박지성', return: 32.5, asset: 2100000000 },
    { rank: 4, name: '손흥민', return: 28.1, asset: 1500000000 },
    { rank: 5, name: '황희찬', return: 25.4, asset: 950000000 }
  ],
  asset: [
    { rank: 1, name: '이재용', return: 5.2, asset: 15000000000 },
    { rank: 2, name: '정의선', return: 8.7, asset: 12000000000 },
    { rank: 3, name: '구광모', return: 3.5, asset: 8000000000 }
  ],
  consultation: [
    { rank: 1, name: '홍길동', return: 12.5, asset: 500000000, count: 24 },
    { rank: 2, name: '임꺽정', return: 15.8, asset: 350000000, count: 18 }
  ]
}

export const customerReturnData = {
  distribution: [
    { range: '30% 이상', count: 12, percentage: 8 },
    { range: '20% ~ 30%', count: 25, percentage: 16 },
    { range: '10% ~ 20%', count: 48, percentage: 32 },
    { range: '0% ~ 10%', count: 35, percentage: 23 },
    { range: '0% 이하', count: 31, percentage: 21 }
  ],
  top3: [
    { name: '김철수', return: 45.2 },
    { name: '이영희', return: 38.7 },
    { name: '박지성', return: 32.5 }
  ],
  bottom3: [
    { name: '최하위', return: -15.4 },
    { name: '차하위', return: -12.1 },
    { name: '삼하위', return: -8.5 }
  ]
}

export const consultationData = [
  { id: 1, userName: '김민수', date: '2026.02.06', time: '14:30', status: '오늘상담', badge: 'bg-green-100 text-green-700' },
  { id: 2, userName: '이영희', date: '2026.02.06', time: '16:00', status: '오늘상담', badge: 'bg-green-100 text-green-700' },
  { id: 3, userName: '박서준', date: '2026.02.07', time: '10:30', status: '상담예정', badge: 'bg-blue-100 text-blue-700' },
  { id: 4, userName: '최유진', date: '2026.02.05', time: '13:20', status: '상담완료', badge: 'bg-gray-100 text-gray-500' },
  { id: 5, userName: '한지혜', date: '2026.02.05', time: '15:45', status: '상담완료', badge: 'bg-gray-100 text-gray-500' }
]
