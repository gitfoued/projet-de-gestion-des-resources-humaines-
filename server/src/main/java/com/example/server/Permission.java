package com.example.server;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Permission {

    MANAGER_CREATE("manager:create"),
    MANAGER_UPDATE("manager:update"),
    MANAGER_DELETE("manager:delete"),
    MANAGER_READ("manager:read");

    @Getter
    private final String permission;
}
