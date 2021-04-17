export default `
    scalar Date
    type User {
      user_id: ID!
      emp_id: Int 
      username: String
      password: String
      status: Int
      work_area_name: String
      org_name: String
      fullname: String
    }

    type Response {
      message: String,
    }

    type UserDuplicateResponse{
      message: String,
      status: Int
    }

    type UserEmp{
      no: Int
      user_id: Int
      emp_id: Int
      code_fullname: String
      emp_code: String
      firstname_th: String
      lastname_th: String
      position_name: String
      org_id: Int
      org_name: String
      work_area_id: Int
      work_area_name: String
      status: Int
    }

    type Employees{
      emp_id: ID!
      emp_code: Int
      firstname: String
      lastname: String
      fullname: String,
      position_id: String
      position_name: String
      org_id: Int
      org_name: String
      work_area_id: Int
      work_area_name: String
    }

    type User_pagination{
      count_totals: Int
      page_limit: Int
      page_totals: Int
      page_current: Int
      page_next: Int
      page_previous: Int
      results: [UserEmp]
    }

    type OrgEmp{
      org_id: ID!
      org_name: String
      org_parent_id: Int
      org_main_id: Int
    }

    type WorkArea {
      work_area_id: ID!
      work_area_name: String
      branch_id: Int
      company_id: Int
    }

    type WorkAreaList {
      work_area_id: ID!
      work_area_name: String
    }

    type UsersList {
      user_id: ID!
      emp_id: Int
      emp_code: String
      org_id: Int
      org_name: String
      work_area_id: Int
      work_area_name: String
      fullname: String
      position_id: Int
      position_name: String
      status: Int
    }

    type Userlist_pagination {
      count_totals: Int
      page_limit: Int
      page_totals: Int
      page_current: Int
      page_next: Int
      page_previous: Int
      results: [UsersList]
    }

    input SA_User_search {
      org_id : Int
      work_area_id : Int
      user_id: Int
    }

    type Query {
      users: [UserEmp]
      user(user_id: Int!): User
      SA_user_userAll_view(pageLimit: Int, page: Int, search: SA_User_search): User_pagination
      org: [OrgEmp]
      employees: [Employees]
      usersById(user_id: ID!): User
      workareaBySearch(searchWorkArea: String): [WorkArea]
      workAreaFilter(work_area_id:ID, org_id:ID): [WorkAreaList]
      userslist(pageLimit: Int, page: Int): Userlist_pagination
      usersFilter(org_id:ID, work_area_id:ID): [UsersList]
      checkDuplicateUser(username: String!): UserDuplicateResponse
    }
    input UserInput {
      user_id: ID
      emp_id: Int
      firstname: String,
      lastname: String,
      position_name: String,
      username: String,
      password: String,
      status: Int
    }
    
    type Mutation {
      SA_user_createuser_create(input: UserInput): User,
      SA_user_edituser_edit(input: UserInput): User
      deleteUser(user_id: ID!): Response
    }
`
