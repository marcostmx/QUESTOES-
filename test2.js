const arr = [1, , 3];
const arr2 = arr.map(q => ({...q, ogSubject: 'Test'}));
console.log(arr2);
const allQ = [...arr2];
console.log(allQ);
try {
  allQ.filter(q => q.ogSubject === 'Test');
} catch (e) {
  console.log(e.message);
}
