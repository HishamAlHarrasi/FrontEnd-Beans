export default function databaseRequest() {
    return [
      {
        userID: 1,
        username: "TheRealBart",
        firstName: "Bart",
        lastName: "Simpson",
        email: "bartSimp@gmail.com",
        admin: true,
        userPrivileges: [
          {
            id: 2,
            canControl: false,
          },
          {
            id: 3,
            canControl: true,
          },
          {
            id: 5,
            canControl: false,
          },
        ],
        failedLoginAttempts: 0,
      },
      {
        userID: 2,
        username: "MikeyTysey",
        firstName: "Mike",
        lastName: "Tyson",
        email: "mikeeeyT@gmail.com",
        admin: false,
        userPrivileges: [
          {
            id: 4,
            canControl: false,
          },
          {
            id: 3,
            canControl: true,
          },
        ],
        failedLoginAttempts: 1,
      },
      {
        userID: 3,
        username: "MortyS123",
        firstName: "Morty",
        lastName: "Smith",
        email: "realMorty123@rick.com",
        admin: true,
        userPrivileges: [
          {
            id: 2,
            canControl: false,
          },
          {
            id: 1,
            canControl: true,
          },
        ],
        failedLoginAttempts: 0,
      },
      {
        userID: 4,
        username: "JDoe",
        firstName: "John",
        lastName: "Doe",
        email: "johnDoe@hotmail.com",
        admin: false,
        userPrivileges: [
          {
            id: 5,
            canControl: true,
          },
        ],
        failedLoginAttempts: 5,
      },
      {
        userID: 5,
        username: "SteveSmiiith",
        firstName: "Steven",
        lastName: "Smith",
        email: "u12345678@warwick.ac.jupiter",
        admin: false,
        userPrivileges: [
          {
            id: 4,
            canControl: false,
          },
        ],
        failedLoginAttempts: 3,
      },
    ];
  };