
package com.example.server.auth;
import com.example.server.entities.Role;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {



    @JsonProperty("access_token")
    private String accessToken;
    private String firstName;
    private String lastName;
    private Role role;
}