import faker from 'faker'

const createUser = () => {
      return {
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName()
      }
    // return faker.name.firstName() + ' ' + faker.name.lastName()
}

// Try changing this to test your input!
const USER_COUNT = 1000

const users = Array(USER_COUNT)
    .fill('')
    .map(x => {
        const user = createUser()
        return user.firstname + ' ' + user.lastname
    })

// This method is for you to edit, create the filtering however you deem necessary.
const filterUsers = (value) => users.filter(user => user.toLowerCase().includes(value.toLowerCase()))

export default filterUsers
