package com.example.back_end_gs.repository;

import com.example.back_end_gs.domain.AssetStatus;
import com.example.back_end_gs.domain.AssetsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface AssetRepository extends JpaRepository<AssetsEntity, Long>, JpaSpecificationExecutor<AssetsEntity> {
    Optional<AssetsEntity> findBySerialNumber(String serialNumber);
    boolean existsBySerialNumber(String serialNumber);
    boolean existsBySerialNumberAndIdNot(String serialNumber, Long id);
    long countByStatus(AssetStatus status);
}
