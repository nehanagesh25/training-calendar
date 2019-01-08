using System.Collections;
using System.Collections.Generic;
using TraingCalanderModel.Model;

namespace TrainingCalendarRepository.Repository.Abstract
{
    public interface IUser
    {
        IEnumerable ValidateUser(User user);
        IEnumerable GetallUsers(User user);
        bool Adduser(User user);
        bool ValidateAdmin(AdminLogin admin);
        IEnumerable<UserLogin> GetallUser();
    }
}
