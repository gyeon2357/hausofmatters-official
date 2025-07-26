const card = document.getElementById("card");
const cardInner = document.getElementById("cardInner");

let isFlipped = false;
let dragRotation = 0;

// ✅ 사용자 조정 수치
const MAX_ROTATION = 180; // 최대 회전 각도
const FLIP_THRESHOLD = 60; // 몇 도 이상 돌리면 뒤집힘으로 인정할지
const ROTATION_MULTIPLIER = 180; // 회전 민감도 (dragRatio * 이 값 = 회전 각도)
const ROTATION_DURATION = 0.125; // 플립 애니메이션 속도 (초 단위)

gsap.registerPlugin(Draggable);

Draggable.create(card, {
  type: "x",
  lockAxis: true,
  allowNativeTouchScrolling: false,

  onPress() {
    this.startX = this.x;
    this.hasDragged = false; // ✨ 드래그 여부 체크
  },

  onDrag() {
    this.hasDragged = true;

    gsap.set(this.target, { x: 0 });

    const dragRatio = this.deltaX / this.target.offsetWidth;
    dragRotation = gsap.utils.clamp(
      -MAX_ROTATION,
      MAX_ROTATION,
      dragRatio * ROTATION_MULTIPLIER
    );

    const base = isFlipped ? 180 : 0;
    gsap.set(cardInner, {
      rotateY: base + dragRotation,
    });
  },

  onRelease() {
    gsap.set(this.target, { x: 0 });

    // ✨ 단순 터치만 했을 경우: 초기 상태로 회전
    if (!this.hasDragged) {
      const reset = isFlipped ? 180 : 0;
      gsap.to(cardInner, {
        rotateY: reset,
        duration: 0.3,
        ease: "power2.out",
      });
      return;
    }

    const shouldFlip = Math.abs(dragRotation) > FLIP_THRESHOLD;
    if (shouldFlip) isFlipped = !isFlipped;

    const targetRotation = isFlipped ? 180 : 0;

    gsap.to(cardInner, {
      rotateY: targetRotation,
      duration: ROTATION_DURATION,
      ease: "power2.out",
    });
  },
});

/// footer btn

// 1. 이미지 다운로드
document.getElementById("downloadBtn").addEventListener("click", () => {
  const img = document.querySelector(".card-front img");
  if (!img) return;

  const link = document.createElement("a");
  link.href = img.src;

  // alt 속성에서 파일명으로 사용할 문자열 가져오기
  const altText = img.alt || "download";
  const fileExtension = img.src.split(".").pop().split(/\#|\?/)[0]; // 예: png, jpg 등

  // alt 텍스트를 파일명으로 사용
  link.download = `${altText}.${fileExtension}`;
  link.click();
});

// 2. 공유 버튼 (Web Share API)
document.getElementById("shareBtn").addEventListener("click", async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: document.title,
        url: window.location.href,
      });
    } catch (err) {
      console.error("공유 취소됨", err);
    }
  } else {
    alert("이 브라우저는 공유 기능을 지원하지 않습니다");
  }
});

// 3. 링크 복사
document.getElementById("copyBtn").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    alert("링크가 복사되었습니다!");
  } catch (err) {
    console.error("복사 실패", err);
    alert("복사 실패 😢");
  }
});
