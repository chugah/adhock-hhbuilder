const age = document.querySelector('[name="age"]');
const relationship = document.querySelector('[name="rel"]');
const smoker = document.querySelector('[name="smoker"]');
const household = document.querySelector('.household')
const debug = document.querySelector('.debug');

const addHouseholdMemberBtn = document.querySelector('.add');
const submitHouseholdMemberBtn = document.querySelector('[type="submit"]');
const updateHouseholdMemberBtn = document.createElement('button');
const cancelEditHouseholdMemberBtn = document.createElement('button');

const householdMembers = [];
let householdMemberIndex = 0;

const submitHouseholdMember = (event) => {
  event.preventDefault();
  debug.innerHTML = JSON.stringify(householdMembers);
  debug.style.display = 'block';
}

const deleteHouseholdMember = (event) => {
  const index = Number(event.target.parentElement.getAttribute('index'));
  householdMembers.splice(index, 1);
  household.innerHTML = renderHousehold();
}

const updateHouseholdMember = (event) => {
  event.preventDefault();
  householdMembers[householdMemberIndex].age = age.value;
  householdMembers[householdMemberIndex].relationship = relationship.value;
  householdMembers[householdMemberIndex].smoker = smoker.checked;
  household.innerHTML = renderHousehold();
  clearForm();
  resetAllBtns();
}

const resetAllBtns = () => {
  addHouseholdMemberBtn.style.display = 'block';
  updateHouseholdMemberBtn.style.display = 'none';
  cancelEditHouseholdMemberBtn.style.display = 'none';
}

const cancelEditHouseholdMember = (event) => {
  event.preventDefault();
  clearForm();
  resetAllBtns();
}

const getCancelEditHouseholdMemberBtnProps = () => {
  cancelEditHouseholdMemberBtn.style.display = 'block';
  cancelEditHouseholdMemberBtn.innerHTML = 'Cancel';
  cancelEditHouseholdMemberBtn.setAttribute('onclick', 'cancelEditHouseholdMember(event)');
  addHouseholdMemberBtn.insertAdjacentElement('afterend', cancelEditHouseholdMemberBtn);
}

const getUpdateHouseholdMemberBtnProps = () => {
  updateHouseholdMemberBtn.style.display = 'block';
  updateHouseholdMemberBtn.innerHTML = 'Update';
  updateHouseholdMemberBtn.setAttribute('onclick', 'updateHouseholdMember(event)');
  addHouseholdMemberBtn.insertAdjacentElement('afterend', updateHouseholdMemberBtn);
}

const editHouseholdMember = (event) => {
  householdMemberIndex = Number(event.target.parentElement.getAttribute('index'));
  age.value = householdMembers[householdMemberIndex].age;
  relationship.value = householdMembers[householdMemberIndex].relationship;
  smoker.checked = householdMembers[householdMemberIndex].smoker;
  addHouseholdMemberBtn.style.display = 'none';
  getUpdateHouseholdMemberBtnProps();
  getCancelEditHouseholdMemberBtnProps();
}

const renderHousehold = () => {
  let listOfHouseholdMembers = '';
  householdMembers.forEach(function (member, index) {
    listOfHouseholdMembers +=
      `<li index=${index}>
        <p>Age: ${member.age}</p>
        <p>Relationship: ${member.relationship}</p>
        <p>Smoker: ${member.smoker}</p>
        <button onclick="editHouseholdMember(event)">Edit</button>
        <button onclick="deleteHouseholdMember(event)">Remove</button>
      </li>`
  });
  return listOfHouseholdMembers;
}

const clearForm = () => {
  age.value = '';
  relationship.selectedIndex = 0;
  smoker.checked = false;
}

const addHouseholdMember = (event) => {
  event.preventDefault();
  if (age.value <= 0 || !age.value){
    window.alert('Please enter age of household member greater than 0.');
  } else if (!relationship.value) {
    window.alert('Please select the relationship of household member.');
  } else {
    householdMembers.push({
      age: age.value,
      relationship: relationship.value,
      smoker: smoker.checked
    });
    clearForm();
  }
  household.innerHTML = renderHousehold();
}

addHouseholdMemberBtn.addEventListener('click', addHouseholdMember);
submitHouseholdMemberBtn.addEventListener('click', submitHouseholdMember);
