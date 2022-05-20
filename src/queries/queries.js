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
        working_status
        face_path
        department {
          name
        }
        manager {
          name
        }
        copied_managers {
          name
        }
        position {
          name
        }
        office {
          name
        }
      }
      paginatorInfo {
        currentPage
        lastPage
        count
      }
    }
  }
`;
const getUser = gql`
  query ($page: Int!, $name: String!) {
    company_users(input: { name: $name }, first: 20, page: $page) {
      data {
        id
        name
        email
        phone
        starts_at
        working_status
        face_path
        department {
          name
        }
        manager {
          name
        }
        copied_managers {
          name
        }
        position {
          name
        }
        office {
          name
        }
      }
      paginatorInfo {
        currentPage
        lastPage
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

const getDepartments = gql`
  {
    company_departments(first: 999) {
      data {
        id
        name
      }
    }
  }
`;

const getPositions = gql`
  {
    company_positions(first: 999) {
      data {
        id
        name
      }
    }
  }
`;

const getOffices = gql`
  {
    company_offices(first: 999) {
      data {
        id
        name
      }
    }
  }
`;

const getAttendanceProfiles = gql`
  {
    company_attendance_profiles(first: 999) {
      data {
        id
        name
      }
    }
  }
`;

const getRoles = gql`
  {
    roles {
      id
      name
    }
  }
`;

const getManagers = gql`
  {
    managers {
      id
      name
    }
  }
`;

// const addUser = gql`
//   mutation(
//     $name: String!
//     $email: String!
//     $phone: String!
//     $starts_at: String!
//     $can_work_home: Int!
//     $role_id: ID!
//     $position_id: ID!
//     $att_profile_id: ID!
//     $manager_id: ID!
//     $department_id: ID!
//     $company_id: ID!
//     $office_id: ID!
//     $has_credentials:Int!
//     $copied_managers: ID!
//     $max_homeDays_per_week: Int!
//     $flexiable_home: Int!
//     $can_ex_days: Int!
//     $start_at: String!
//     $salary_management_type: Int!
//   ){
//     store_user_with_user_salary_config(
//       input:{
//       user_input: {
//         name: $name
//         email: $email
//         phone: $phone
//         starts_at: $starts_at
//         department_id: $department_id
//         role_id: $role_id
//         position_id: $position_id
//         att_profile_id: $att_profile_id
//         manager_id: $manager_id
//         office_id: $office_id
//         company_id: $company_id
//         has_credentials: 1
//         copied_managers: $copied_managers
//         can_work_home: $can_work_home
//         max_homeDays_per_week: 0
//         flexible_home: 0
//         can_ex_days: 0
//       }
//       user_salary_config_input: {
//         salary_config:{
//           start_at: $starts_at
//           salary_management_type: 2
//         }
//       }
//     ){
//       id
//       name
//       phone
//       email
//     }
//   }
// `;

const addUser = gql`
  mutation(
    $name: String!
    $email: String!
    $phone: String!
    $starts_at: String!
    $can_work_home: Int!
    $role_id: ID!
    $position_id: ID!
    $att_profile_id: ID!
    $manager_id: ID!
    $department_id: ID!
    $company_id: ID!
    $office_id: ID!
    $copied_managers: [ID!]
  ){
    store_user_with_user_salary_config(
      input:{
      user_input: {
        id: null
        name: $name
        email: $email
        phone: $phone
        starts_at: $starts_at
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
        salary_config:{
          id: null
          start_at: $starts_at
          salary_management_type: 2
        }
      }
    }
    ){
     id
     name
     phone
     email 
  }}
`;

export {
  getUsers,
  getUser,
  deleteUser,
  getDepartments,
  getPositions,
  getOffices,
  getAttendanceProfiles,
  getRoles,
  getManagers,
  addUser,
};
