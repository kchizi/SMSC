package io.smsc.repository.user;

import io.smsc.converters.CryptoConverter;
import io.smsc.model.Role;
import io.smsc.model.User;
import io.smsc.model.dashboard.Dashboard;
import io.smsc.repository.dashboard.dashboard.DashboardRepository;
import io.smsc.repository.role.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;

@Component
public class UserRepositoryImpl implements UserRepositoryCustom {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Value("${encrypt.key}")
    private String secretKey;

    @Override
    public User addRole(Long userId, Long roleId){
        User user = userRepository.getOneWithRolesAndDecryptedPassword(userId);
        Role role = roleRepository.findOne(roleId);
        user.addRole(role);
        role.addUser(user);
        roleRepository.save(role);
        userRepository.saveOneWithEncryptedPassword(user);
        return userRepository.getOneWithRolesAndDecryptedPassword(userId);
    }

    @Override
    public User removeRole(Long userId, Long roleId){
        User user = userRepository.getOneWithRolesAndDecryptedPassword(userId);
        Role role = roleRepository.findOne(roleId);
        user.removeRole(role);
        role.removeUser(user);
        roleRepository.save(role);
        userRepository.saveOneWithEncryptedPassword(user);
        return userRepository.getOneWithRolesAndDecryptedPassword(userId);
    }

    @Override
    public User getOneWithDecryptedPassword(Long id){
        User user = userRepository.findOne(id);
        if(user == null) {
            return null;
        }
        CryptoConverter.decrypt(user,secretKey);
        return user;
    }

    @Override
    public User getOneWithRolesAndDecryptedPassword(Long id) {
        User user = userRepository.findOne(id);
        if(user == null) {
            return null;
        }
        CryptoConverter.decrypt(user,secretKey);
        return user;
    }

    @Override
    public User getOneByEmailWithDecryptedPassword(String email){
        User user = userRepository.findByEmail(email);
        if(user == null) {
            return null;
        }
        CryptoConverter.decrypt(user,secretKey);
        return user;
    }

    @Override
    public User getOneByUserNameWithDecryptedPassword(String username){
        User user = userRepository.findByUsername(username);
        if(user == null) {
            return null;
        }
        CryptoConverter.decrypt(user,secretKey);
        return user;
    }

    @Override
    public List<User> getAllWithRolesAndDecryptedPassword() {
        List<User> users = userRepository.findAllDistinctByOrderById();
        users.forEach(user -> CryptoConverter.decrypt(user,secretKey));
        return users;
    }

    @Override
    public User saveOneWithEncryptedPassword(User user){
        CryptoConverter.encrypt(user,secretKey);
        return userRepository.save(user);
    }
}
