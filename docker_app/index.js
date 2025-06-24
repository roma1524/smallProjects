let count = 0;
const intervalId = setInterval(() => {
    console.log('Строка: ' + count);
    count++;
    if (count >= 100) {
        clearInterval(intervalId);  // Останавливаем, когда достигли 100
    }
}, 1000);