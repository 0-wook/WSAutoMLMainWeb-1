package kr.co.automl.domain.user.api;

import kr.co.automl.domain.user.dto.UserResponse;
import kr.co.automl.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("user")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class UserApi {
    private final UserService userService;

    @GetMapping
    public List<UserResponse> users() {
        return userService.getUsers();
    }
}
