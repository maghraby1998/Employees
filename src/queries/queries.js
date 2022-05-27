import { gql } from "@apollo/client";

const getUsers = gql`
  query ($page: Int!, $name: String) {
    company_users(first: 20, page: $page, input: { name: $name }) {
      data {
        id
        name
        email
        phone
        starts_at
        # working_status
        profile_picture {
          id
          path
        }
        face {
          id
          path
        }
        face_path
        department {
          id
          name
        }
        manager {
          id
          name
        }
        copied_managers {
          id
          name
        }
        position {
          id
          name
        }
        office {
          id
          name
        }
        attendance_profile {
          id
          name
        }
      }
      paginatorInfo {
        currentPage
        lastPage
        count
        total
      }
    }
  }
`;

const getUser = gql`
  query ($id: ID) {
    user(id: $id) {
      id
      name
      email
      phone
      starts_at
      working_status
      can_work_home
      profile_picture {
        id
        path
      }
      face {
        id
        path
      }
      face_path
      department {
        id
        name
      }
      manager {
        id
        name
      }
      copied_managers {
        id
        name
      }
      position {
        id
        name
      }
      office {
        id
        name
      }
      attendance_profile {
        id
        name
      }
    }
  }
`;

const deleteUser = gql`
  mutation ($id: ID!, $password: String!) {
    delete_user(id: $id, password: $password) {
      status
      message
    }
  }
`;

const getInputsData = gql`
  query ($isDepartment: Boolean!) {
    company_departments(first: 999) {
      data {
        id
        name @include(if: $isDepartment)
      }
    }
    company_positions(first: 999) {
      data {
        id
        name
      }
    }
    company_offices(first: 999) {
      data {
        id
        name
      }
    }
    company_attendance_profiles(first: 999) {
      data {
        id
        name
      }
    }
    roles {
      id
      name
    }
    managers {
      id
      name
    }
  }
`;

const getInputsDataAndUserInfo = gql`
  query ($getUserInfo: Boolean!, $id: ID) {
    user(id: $id) @include(if: $getUserInfo) {
      id
      name
      email
      phone
      starts_at
      working_status
      can_work_home
      profile_picture {
        id
        path
      }
      face {
        id
        path
      }
      face_path
      department {
        id
        name
      }
      manager {
        id
        name
      }
      copied_managers {
        id
        name
      }
      position {
        id
        name
      }
      office {
        id
        name
      }
      attendance_profile {
        id
        name
      }
    }
    company_departments(first: 999) {
      data {
        id
        name
      }
    }
    company_positions(first: 999) {
      data {
        id
        name
      }
    }
    company_offices(first: 999) {
      data {
        id
        name
      }
    }
    company_attendance_profiles(first: 999) {
      data {
        id
        name
      }
    }
    roles {
      id
      name
    }
    managers {
      id
      name
    }
  }
`;

const addUser = gql`
  mutation (
    $name: String!
    $email: String
    $phone: String
    $starts_at: String!
    $can_work_home: Int
    $role_id: ID
    $position_id: ID
    $att_profile_id: ID
    $manager_id: ID!
    $department_id: ID!
    $company_id: ID!
    $office_id: ID!
    $copied_managers: [ID!]
    $user_image: Upload
  ) {
    store_user_with_user_salary_config(
      input: {
        user_input: {
          id: null
          name: $name
          email: $email
          phone: $phone
          starts_at: $starts_at
          user_image: $user_image
          department_id: $department_id
          role_id: $role_id
          position_id: $position_id
          att_profile_id: $att_profile_id
          manager_id: $manager_id
          office_id: $office_id
          company_id: $company_id
          has_credentials: 1
          copied_managers: $copied_managers
          can_work_home: $can_work_home
          max_homeDays_per_week: 0
          flexible_home: 0
          can_ex_days: 0
        }
        user_salary_config_input: {
          salary_config: {
            id: null
            start_at: $starts_at
            salary_management_type: 2
          }
        }
      }
    ) {
      id
      name
      phone
      email
    }
  }
`;

const updateUser = gql`
  mutation (
    $id: ID!
    $name: String!
    $email: String!
    $phone: String!
    $starts_at: String!
    $can_work_home: Int!
    $position_id: ID!
    $att_profile_id: ID!
    $manager_id: ID!
    $department_id: ID!
    $company_id: ID!
    $user_image: Upload
    $office_id: ID!
    $copied_managers: [ID!]
  ) {
    update_user(
      input: {
        user_input: {
          id: $id
          name: $name
          email: $email
          phone: $phone
          starts_at: $starts_at
          user_image: $user_image
          department_id: $department_id
          position_id: $position_id
          att_profile_id: $att_profile_id
          manager_id: $manager_id
          office_id: $office_id
          company_id: $company_id
          has_credentials: 1
          copied_managers: $copied_managers
          can_work_home: $can_work_home
          max_homeDays_per_week: 0
          flexible_home: 0
          can_ex_days: 0
        }
      }
    ) {
      name
      email
      phone
      starts_at
    }
  }
`;

export {
  getUsers,
  getUser,
  deleteUser,
  getInputsData,
  addUser,
  updateUser,
  getInputsDataAndUserInfo,
};
