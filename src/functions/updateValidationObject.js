const validationObject = (indicator, newCopiedManagers, employee) => {
    let validationObject;
    if (indicator) {
      validationObject = {
        id: employee.id,
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        starts_at: employee.startDate,
        can_work_home: employee.workFromHome,
        position_id: employee.position,
        att_profile_id: employee.attendance,
        manager_id: employee.manager,
        department_id: employee.department,
        company_id: 1,
        office_id: employee.office,
        has_credentials: 1,
        copied_managers: newCopiedManagers,
        max_homeDays_per_week: 0,
        flexiable_home: 0,
        can_ex_days: 0,
      };
    } else {
      validationObject = {
        id: employee.id,
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        starts_at: employee.startDate,
        can_work_home: employee.workFromHome,
        position_id: employee.position,
        user_image: employee.user_image,
        att_profile_id: employee.attendance,
        manager_id: employee.manager,
        department_id: employee.department,
        company_id: 1,
        office_id: employee.office,
        has_credentials: 1,
        copied_managers: newCopiedManagers,
        max_homeDays_per_week: 0,
        flexiable_home: 0,
        can_ex_days: 0,
      };
    }
    return validationObject;
  };

  export default validationObject