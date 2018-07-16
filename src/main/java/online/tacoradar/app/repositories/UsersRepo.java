package online.tacoradar.app.repositories;

import online.tacoradar.app.models.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepo extends CrudRepository<User, Long> {
    User findByUsername(String username);
}
