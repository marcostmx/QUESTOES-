const todayStart = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime();
for (let i = 0; i <= 3; i++) {
    // using + i days instead of milliseconds is safer for DST:
    const targetDate = new Date();
    targetDate.setHours(0,0,0,0);
    targetDate.setDate(targetDate.getDate() + i);
    console.log(i, targetDate.toString());
}
