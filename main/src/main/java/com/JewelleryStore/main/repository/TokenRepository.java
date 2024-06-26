package com.JewelleryStore.main.repository;

import com.JewelleryStore.main.model.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TokenRepository extends JpaRepository<Token, Integer> {
    @Query("""
        select t from Token t inner join User u on t.user.id = u.id
        where t.user.id = :userId and t.loggedOut = false
        """)
    List<Token> findAllTokenByUser(UUID userId);

    Optional<Token> findByToken(String token);
}
