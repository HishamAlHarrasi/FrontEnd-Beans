export default function databaseRequest() {
    return [
      {
        userID: 1,
        username: "TheRealBart",
        firstName: "Bart",
        lastName: "Simpson",
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