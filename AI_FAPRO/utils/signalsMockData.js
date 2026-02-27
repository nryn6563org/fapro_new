export const buySignals = [
  {
    id: 'buy-1',
    time: '09:32',
    ticker: '263750',
    name: '펄어비스',
    price: '₩42,500',
    change: '+7.19%',
    reason:
      "전일 대비 거래량이 320% 급증하며 52주 신고가를 돌파했습니다. 기술적 분석 결과 골든크로스 형성과 함께 RSI 지표가 강세권 진입을 확인했으며, 외국인 및 기관의 동반 순매수세가 유입되고 있습니다. 신작 '붉은사막' 글로벌 출시 임박 소식과 함께 메타버스 사업 확장 발표로 모멘텀이 강화되고 있습니다.",
    aiReport:
      '펄어비스는 현재 강력 매수 모멘텀을 보이고 있습니다.\n\n1. 기술적 분석: 5일선과 20일선 골든크로스 형성으로 단기 상승 추세가 확인되었습니다. RSI 지표 65로 강세권 진입.\n\n2. 펀더멘털: 신작 출시 기대감.\n3. 투자자 동향: 외인/기관 양매수 지속.',
    priceHistory: [
      { date: '1/15', price: 40000 },
      { date: '1/20', price: 40500 },
      { date: '1/25', price: 41200 },
      { date: '1/30', price: 41800 },
      { date: '2/5', price: 42000 },
      { date: '2/10', price: 42500 }
    ],
    tradeHistory: [
      { date: '2024-02-10', signal: '매수', price: '₩42,500', return: '+7.19%' },
      { date: '2024-01-28', signal: '매도', price: '₩39,600', return: '+12.4%' },
      { date: '2024-01-15', signal: '매수', price: '₩35,200', return: '-' }
    ]
  },
  {
    id: 'buy-2',
    time: '11:20',
    ticker: '263720',
    name: '컴투오젠',
    price: '₩285,000',
    change: '+4.3%',
    reason: '4분기 실적이 컨센서스를 상회하며 서프라이즈를 기록했습니다.',
    aiReport: '단기 급상승세가 두드러지는 종목입니다.',
    priceHistory: [
      { date: '1/15', price: 270000 },
      { date: '2/10', price: 285000 }
    ],
    tradeHistory: [{ date: '2024-02-10', signal: '매수', price: '₩285,000', return: '+4.3%' }]
  },
  {
    id: 'buy-3',
    time: '13:45',
    ticker: '247540',
    name: '에코프로비엠',
    price: '₩178,500',
    change: '+3.2%',
    reason: '장기 공급계약 소식',
    aiReport: '중장기 투자 유망.',
    priceHistory: [
      { date: '1/15', price: 170000 },
      { date: '2/10', price: 178500 }
    ],
    tradeHistory: [{ date: '2024-02-10', signal: '매수', price: '₩178,500', return: '+3.2%' }]
  }
]

export const sellSignals = [
  {
    id: 'sell-1',
    time: '10:15',
    ticker: '298690',
    name: '카카오게임즈',
    price: '₩34,850',
    change: '-12.5%',
    reason: '급등 후 과열 신호 포착',
    aiReport: '차익 실현 타이밍',
    priceHistory: [
      { date: '1/15', price: 40000 },
      { date: '1/20', price: 39000 },
      { date: '2/10', price: 34850 }
    ],
    tradeHistory: [
      { date: '2024-02-10', signal: '매도', price: '₩34,850', return: '-12.5%' },
      { date: '2024-01-18', signal: '매수', price: '₩39,800', return: '+8.5%' }
    ]
  },
  {
    id: 'sell-2',
    time: '14:22',
    ticker: '035420',
    name: '씨젠',
    price: '₩45,200',
    change: '-3.2%',
    reason: '주요 지지선 하향 이탈',
    aiReport: '손절매 권장',
    priceHistory: [
      { date: '1/15', price: 47000 },
      { date: '2/10', price: 45200 }
    ],
    tradeHistory: [{ date: '2024-02-10', signal: '매도', price: '₩45,200', return: '-3.2%' }]
  }
]
