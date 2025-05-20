const apiUrl = 'https://jsonplaceholder.typicode.com/users';
const form = document.getElementById('user-form');
const userList = document.getElementById('user-list');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  try {
    const res = await axios.post(apiUrl, { name, email });
    addUserToUI(res.data);
    form.reset();
  } catch (err) {
    console.error('Error adding user:', err);
  }
});

function addUserToUI(user) {
  const li = document.createElement('li');
  li.className = 'user-item';
  li.setAttribute('data-id', user.id);
  li.innerHTML = `
    <span>${user.name} (${user.email})</span>
    <button class="edit">Edit</button>
    <button class="delete">Delete</button>
  `;
  userList.appendChild(li);
}

async function fetchUsers() {
  try {
    const res = await axios.get(apiUrl);
    res.data.slice(0, 5).forEach(user => addUserToUI(user));
  } catch (err) {
    console.error('Error fetching users:', err);
  }
}

userList.addEventListener('click', async (e) => {
  if (e.target.classList.contains('delete')) {
    const li = e.target.parentElement;
    const userId = li.getAttribute('data-id');

    try {
      await axios.delete(`${apiUrl}/${userId}`);
      li.remove();
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  }

  if (e.target.classList.contains('edit')) {
    const li = e.target.parentElement;
    const userId = li.getAttribute('data-id');
    const name = prompt('Enter new name:');
    const email = prompt('Enter new email:');

    if (name && email) {
      try {
        const res = await axios.put(`${apiUrl}/${userId}`, { name, email });
        li.querySelector('span').textContent = `${res.data.name} (${res.data.email})`;
      } catch (err) {
        console.error('Error updating user:', err);
      }
    }
  }
});

fetchUsers();
