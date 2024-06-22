


        const showModalBtn = document.querySelector(".show-modal");
const bottomSheet = document.querySelector(".bottom-sheet");
const sheetOverlay = bottomSheet.querySelector(".sheet-overlay");
const sheetContent = bottomSheet.querySelector(".content");
const dragIcon = bottomSheet.querySelector(".drag-icon");

let isDragging = false, startY, startHeight;
let isBottomSheetOpen = false; // حالة النافذة المنبثقة

const showBottomSheet = () => {
    isBottomSheetOpen = !isBottomSheetOpen; // تبديل قيمة حالة النافذة
    bottomSheet.classList.toggle("show", isBottomSheetOpen);
    document.body.style.overflowY = isBottomSheetOpen ? "hidden" : "auto";
    updateSheetHeight(isBottomSheetOpen ? 70 : 50);
}

const updateSheetHeight = (height) => {
    sheetContent.style.height = `${height}vh`;
    bottomSheet.classList.toggle("fullscreen", height === 100);
}

const hideBottomSheet = () => {
    isBottomSheetOpen = false;
    bottomSheet.classList.remove("show");
    document.body.style.overflowY = "auto";
    showModalBtn.classList.remove("active");
}


const toggleBottomSheet = () => {
    isBottomSheetOpen ? hideBottomSheet() : showBottomSheet();
}

const dragStart = (e) => {
    isDragging = true;
    startY = e.pageY || e.touches?.[0].pageY;
    startHeight = parseInt(sheetContent.style.height);
    bottomSheet.classList.add("dragging");
}

const dragging = (e) => {
    if (!isDragging) return;
    const delta = startY - (e.pageY || e.touches?.[0].pageY);
    const newHeight = startHeight + delta / window.innerHeight * 100;
    updateSheetHeight(newHeight);
}

const dragStop = () => {
    isDragging = false;
    bottomSheet.classList.remove("dragging");
    const sheetHeight = parseInt(sheetContent.style.height);
    sheetHeight < 25 ? hideBottomSheet() : sheetHeight > 75 ? updateSheetHeight(100) : updateSheetHeight(50);
}

dragIcon.addEventListener("mousedown", dragStart);
document.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
dragIcon.addEventListener("touchstart", dragStart);
document.addEventListener("touchmove", dragging);
document.addEventListener("touchend", dragStop);
sheetOverlay.addEventListener("click", hideBottomSheet);
showModalBtn.addEventListener("click", toggleBottomSheet);