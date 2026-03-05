/**
 * 기능: 고객 정보 관련 유틸리티 함수
 */

/**
 * 텍스트에서 회원정보 추출 (OCR 또는 붙여넣기 텍스트 파싱)
 */
export const extractClientInfoFromText = (text) => {
  const extracted = {};

  // 이름 추출 (한글 2-4자)
  const nameMatch = text.match(
    /이름[:\s]*([가-힣]{2,4})|성명[:\s]*([가-힣]{2,4})|고객명[:\s]*([가-힣]{2,4})/
  );
  if (nameMatch) {
    extracted.name = nameMatch[1] || nameMatch[2] || nameMatch[3];
  }

  // 전화번호 추출
  const phoneMatch = text.match(/01[0-9][-\s]?[0-9]{3,4}[-\s]?[0-9]{4}/);
  if (phoneMatch) {
    extracted.phone = phoneMatch[0].replace(/\s/g, "");
  }

  // 이메일 추출
  const emailMatch = text.match(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
  );
  if (emailMatch) {
    extracted.email = emailMatch[0];
  }

  // 나이 추출
  const ageMatch = text.match(
    /나이[:\s]*(\d{2})|연령[:\s]*(\d{2})|(\d{2})\s*세/
  );
  if (ageMatch) {
    extracted.age = parseInt(ageMatch[1] || ageMatch[2] || ageMatch[3]);
  }

  // 투자유형 추출
  if (
    text.includes("공격형") ||
    text.includes("공격투자") ||
    text.includes("적극")
  ) {
    extracted.investmentType = "공격형";
  } else if (
    text.includes("안정형") ||
    text.includes("안정투자") ||
    text.includes("보수")
  ) {
    extracted.investmentType = "안정형";
  } else if (
    text.includes("중립형") ||
    text.includes("균형") ||
    text.includes("중도")
  ) {
    extracted.investmentType = "중립형";
  }

  // 자산 추출
  const assetMatch = text.match(
    /자산[:\s]*([0-9,.]+\s*[억만천원]+)|총자산[:\s]*([0-9,.]+\s*[억만천원]+)|([0-9,.]+)\s*[억만천원]+/
  );
  if (assetMatch) {
    extracted.totalAssets = (
      assetMatch[1] ||
      assetMatch[2] ||
      assetMatch[3]
    ).trim();
  }

  // 보유종목 추출
  const stockMatch = text.match(/보유종목[:\s]*([가-힣a-zA-Z0-9,.\s]+)/);
  if (stockMatch) {
    extracted.holdings = stockMatch[1].trim();
  }

  // 특이사항/메모 추출
  const notesMatch = text.match(
    /특이사항[:\s]*([^\n]+)|메모[:\s]*([^\n]+)|비고[:\s]*([^\n]+)/
  );
  if (notesMatch) {
    extracted.notes = (notesMatch[1] || notesMatch[2] || notesMatch[3]).trim();
  }

  return extracted;
};

/**
 * 투자금액 합계 계산
 */
export const calculateTotalInvestment = (holdings) => {
  if (!holdings) return 0;
  return holdings.reduce((sum, h) => sum + h.avgPrice * h.quantity, 0);
};

/**
 * 현재 평가금액 합계 계산
 */
export const calculateCurrentValue = (holdings, currentPrices) => {
  if (!holdings) return 0;
  return holdings.reduce((sum, h) => {
    const price = currentPrices[h.name] || h.avgPrice;
    return sum + price * h.quantity;
  }, 0);
};

/**
 * 총 수익률 계산
 */
export const calculateTotalReturn = (holdings, currentPrices) => {
  const investment = calculateTotalInvestment(holdings);
  const currentValue = calculateCurrentValue(holdings, currentPrices);
  if (investment === 0) return 0;
  return ((currentValue - investment) / investment) * 100;
};
